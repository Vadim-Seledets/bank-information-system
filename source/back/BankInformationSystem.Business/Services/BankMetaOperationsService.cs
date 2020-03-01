using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Common.Extensions;
using BankInformationSystem.Common.Models;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BankInformationSystem.Business.Services
{
    public class BankMetaOperationsService : IBankMetaOperationsService
    {
        private readonly BankInformationSystemDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentDateTimeProvider _currentDateTimeProvider;
        private readonly IVirtualDateTimeManager _virtualDateTimeManager;
        private readonly IConfiguration _configuration;

        public BankMetaOperationsService(
            BankInformationSystemDbContext context,
            IMapper mapper,
            ICurrentDateTimeProvider currentDateTimeProvider,
            IVirtualDateTimeManager virtualDateTimeManager,
            IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _currentDateTimeProvider = currentDateTimeProvider;
            _virtualDateTimeManager = virtualDateTimeManager;
            _configuration = configuration;
        }
        
        public async Task<BankOperationAuxiliaryInfo> GetBankOperationsAuxiliaryInfoAsync()
        {
            return new BankOperationAuxiliaryInfo
            {
                Cities = await _mapper
                    .ProjectTo<CityModel>(_context.Cities.AsNoTracking())
                    .ToListAsync(),
                CountriesOfCitizenship = await _mapper
                    .ProjectTo<CitizenshipModel>(_context.CountriesOfCitizenship.AsNoTracking())
                    .ToListAsync(),
                Disabilities = await _mapper
                    .ProjectTo<DisabilityModel>(_context.Disabilities.AsNoTracking())
                    .ToListAsync(),
                Currencies = await _mapper
                    .ProjectTo<CurrencyModel>(_context.Currencies.AsNoTracking())
                    .ToListAsync(),
                MaritalStatuses = await _mapper
                    .ProjectTo<MaritalStatusModel>(_context.MaritalStatuses.AsNoTracking())
                    .ToListAsync(),
                DepositTypes = await _mapper
                    .ProjectTo<DepositTypeModel>(_context.DepositTypes.AsNoTracking())
                    .ToListAsync(),
                LoanTypes = await _mapper
                    .ProjectTo<LoanTypeModel>(_context.LoanTypes.AsNoTracking())
                    .ToListAsync(),
                MobileCarriers = await _mapper
                    .ProjectTo<MobileCarrierModel>(_context.MobileCarriers.AsNoTracking())
                    .ToListAsync()
            };
        }

        // For system emulation purposes it will increment virtual date offset from current date
        public async Task CloseBankDayAsync(int times)
        {
            if (times <= 0)
            {
                return;
            }
            
            foreach (var _ in Enumerable.Range(1, times))
            {
                var freshTransactions = await ProcessDepositsAndLoansAsync();
                await CommitActiveTransactionsAsync(freshTransactions);
                await _virtualDateTimeManager.SkipDaysAsync(1);
            }
            
            await _context.SaveChangesAsync();
            await _virtualDateTimeManager.CommitAsync();
        }

        private async Task<IList<Transaction>> ProcessDepositsAndLoansAsync()
        {
            var now = _currentDateTimeProvider.Now();
            var today = _currentDateTimeProvider.Now().Date;
            var isLastDayOfMonth = DateTime.DaysInMonth(today.Year, today.Month) == today.Day;

            var bankDevelopmentFunds = await _context.Accounts
                .Where(x => x.Type == AccountType.BankDevelopmentFund)
                .ToDictionaryAsync(x => x.CurrencyId, x => x);

            // Process irrevocable deposits at ProgramEndDate,
            // process revocable deposits at ProgramEndDate and the last day of each month
            var depositContractsQuery = _context.DepositContracts
                .Include(x => x.DepositAccount)
                .Include(x => x.RegularAccount)
                .Include(x => x.LatestInterestTransaction)
                .Where(x => !x.IsCompleted && !x.IsRevoked && x.ProgramStartDate < today && x.ProgramEndDate >= today)
                .Where(x => x.DepositTypeId == (int)MainDepositType.Irrevocable && x.ProgramEndDate == today
                    || x.DepositTypeId == (int)MainDepositType.Revocable && (x.ProgramEndDate == today || isLastDayOfMonth));
            var depositContracts = (await depositContractsQuery.ToListAsync())
                .GroupBy(x => x.DepositTypeId)
                .ToDictionary(x => x.Key, x => x.ToList());

            var loanContractPaymentsToProcessLatestTransactionDate = today.AddDays(-_configuration.GetValue<int>("LoanTermDays")).Date;
            
            // If any cached loan contracts to process exist, take cached versions, not the ones from DB.
            var localLoanContracts = GetQueryForLoanContractsToProcess(
                _context.ChangeTracker.Entries<LoanContract>()
                    .Where(x => x.State == EntityState.Modified)
                    .Select(x => x.Entity)
                    .AsQueryable(),
                loanContractPaymentsToProcessLatestTransactionDate,
                today).ToList();
            var localLoanContractsIds = localLoanContracts.Select(x => x.ContractNumber).ToList();
            var loadedLoanContracts = await GetQueryForLoanContractsToProcess(_context.LoanContracts, loanContractPaymentsToProcessLatestTransactionDate, today)
                .Where(x => !localLoanContractsIds.Contains(x.ContractNumber))
                .ToListAsync();
            var loanContracts = loadedLoanContracts.Union(localLoanContracts);

            var loanContractsDictionary = loanContracts
                .GroupBy(x => x.LoanTypeId)
                .ToDictionary(x => x.Key, x => x.ToList());
            
            var transactions = new List<Transaction>();

            if (depositContracts.TryGetValue((int)MainDepositType.Irrevocable, out var irrevocableDeposits))
            {
                transactions.AddRange(ProcessIrrevocableDeposits(irrevocableDeposits, bankDevelopmentFunds, now));
            }

            if (depositContracts.TryGetValue((int) MainDepositType.Revocable, out var revocableDeposits))
            {
                transactions.AddRange(ProcessRevocableDeposits(revocableDeposits, bankDevelopmentFunds, now));
            }
            
            if (loanContractsDictionary.TryGetValue((int) MainLoanType.Annuity, out var annuityLoans))
            {
                transactions.AddRange(ProcessAnnuityLoans(annuityLoans, bankDevelopmentFunds, now));
            }
            
            if (loanContractsDictionary.TryGetValue((int) MainLoanType.Differential, out var differentialLoans))
            {
                transactions.AddRange(ProcessDifferentialLoans(differentialLoans, bankDevelopmentFunds, now));
            }

            return transactions;
        }

        private IList<Transaction> ProcessAnnuityLoans(
            IEnumerable<LoanContract> loanContracts,
            IDictionary<int, Account> bankDevelopmentFunds,
            DateTime now)
        {
            var transactions = new List<Transaction>();

            foreach (var loanContract in loanContracts)
            {
                var loanPaymentTransaction = _context.Transactions.Add(new Transaction
                {
                    ContractNumber = loanContract.ContractNumber,
                    CurrencyId = loanContract.CurrencyId,
                    Amount = loanContract.Amount /
                        ((decimal)loanContract.ProgramEndDate.Subtract(loanContract.ProgramStartDate).TotalDays /
                        _configuration.GetValue<int>("LoanTermDays")) + loanContract.Amount * loanContract.Rate,
                    CreatedAt = now,
                    SenderAccountNumber = loanContract.LoanPaymentAccountNumber,
                    SenderAccount = loanContract.LoanPaymentAccount,
                    ReceiverAccountNumber = bankDevelopmentFunds[loanContract.CurrencyId].AccountNumber,
                    ReceiverAccount = bankDevelopmentFunds[loanContract.CurrencyId]
                }).Entity;
                
                if (loanContract.ProgramEndDate == now.Date)
                {
                    loanContract.IsCompleted = true;
                    loanContract.CompletedAt = now;
                }

                loanContract.LatestPaymentTransaction = loanPaymentTransaction;
                transactions.Add(loanPaymentTransaction);
            }

            return transactions;
        }
        
        private IList<Transaction> ProcessDifferentialLoans(
            IEnumerable<LoanContract> loanContracts,
            IDictionary<int, Account> bankDevelopmentFunds,
            DateTime now)
        {
            var transactions = new List<Transaction>();

            foreach (var loanContract in loanContracts)
            {
                var mainPart = loanContract.Amount /
                    ((decimal)loanContract.ProgramEndDate.Subtract(loanContract.ProgramStartDate).TotalDays /
                    _configuration.GetValue<int>("LoanTermDays"));
                var loanRepaymentsPart = (loanContract.Amount - (decimal)(loanContract.LatestPaymentTransaction?.CreatedAt ?? loanContract.ProgramStartDate)
                    .Subtract(loanContract.ProgramStartDate).TotalDays / _configuration.GetValue<int>("LoanTermDays") * mainPart) * loanContract.Rate;

                var loanPaymentTransaction = _context.Transactions.Add(new Transaction
                {
                    ContractNumber = loanContract.ContractNumber,
                    CurrencyId = loanContract.CurrencyId,
                    Amount = mainPart + loanRepaymentsPart,
                    CreatedAt = now,
                    SenderAccountNumber = loanContract.LoanPaymentAccountNumber,
                    SenderAccount = loanContract.LoanPaymentAccount,
                    ReceiverAccountNumber = bankDevelopmentFunds[loanContract.CurrencyId].AccountNumber,
                    ReceiverAccount = bankDevelopmentFunds[loanContract.CurrencyId]
                }).Entity;
                
                if (loanContract.ProgramEndDate == now.Date)
                {
                    loanContract.IsCompleted = true;
                    loanContract.CompletedAt = now;
                }

                loanContract.LatestPaymentTransaction = loanPaymentTransaction;
                transactions.Add(loanPaymentTransaction);
            }

            return transactions;
        }

        private IList<Transaction> ProcessIrrevocableDeposits(
            IEnumerable<DepositContract> depositContracts,
            IDictionary<int, Account> bankDevelopmentFunds,
            DateTime now)
        {
            var transactions = new List<Transaction>();
            
            foreach (var depositContract in depositContracts)
            {
                var interestTransaction = _context.Transactions.Add(new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount * depositContract.Rate 
                        * (decimal)depositContract.ProgramEndDate.DifferenceInMonths(depositContract.ProgramStartDate),
                    CreatedAt = now,
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.DepositAccountNumber,
                    ReceiverAccount = depositContract.DepositAccount
                }).Entity;
                
                depositContract.LatestInterestTransaction = interestTransaction;
                transactions.Add(interestTransaction);

                var returnTransaction = _context.Transactions.Add(new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = now,
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.RegularAccountNumber,
                    ReceiverAccount = depositContract.RegularAccount
                }).Entity;
                
                transactions.Add(returnTransaction);
                depositContract.CompletedAt = now;
                depositContract.IsCompleted = true;
            }

            return transactions;
        }
        
        private IList<Transaction> ProcessRevocableDeposits(
            IEnumerable<DepositContract> depositContracts,
            IDictionary<int, Account> bankDevelopmentFunds,
            DateTime now)
        {
            var transactions = new List<Transaction>();
            
            foreach (var depositContract in depositContracts)
            {
                var interestCalculationStartDate = depositContract.LatestInterestTransaction?.CreatedAt 
                    ?? depositContract.ProgramStartDate;
                var interestTransaction = _context.Transactions.Add(new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount * depositContract.Rate * (decimal)now.DifferenceInMonths(interestCalculationStartDate),
                    CreatedAt = now,
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.DepositAccountNumber,
                    ReceiverAccount = depositContract.DepositAccount
                }).Entity;
                
                depositContract.LatestInterestTransaction = interestTransaction;
                transactions.Add(interestTransaction);

                var today = now.Date;
                if (depositContract.ProgramEndDate != today)
                {
                    continue;
                }

                var returnTransaction = _context.Transactions.Add(new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = now,
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.RegularAccountNumber,
                    ReceiverAccount = depositContract.RegularAccount
                }).Entity;
                
                transactions.Add(returnTransaction);
                depositContract.CompletedAt = now;
                depositContract.IsCompleted = true;
            }

            return transactions;
        }

        private IQueryable<LoanContract> GetQueryForLoanContractsToProcess(
            IQueryable<LoanContract> loanContracts,
            DateTime loanContractPaymentsToProcessLatestTransactionDate,
            DateTime today)
        {
            return loanContracts
                .Include(x => x.LoanPaymentAccount)
                .Include(x => x.RegularAccount)
                .Include(x => x.LatestPaymentTransaction)
                .Where(x => !x.IsCompleted && x.ProgramStartDate < today && x.ProgramEndDate >= today)
                .Where(x => x.LatestPaymentTransaction.CreatedAt.Date == loanContractPaymentsToProcessLatestTransactionDate
                            || x.ProgramStartDate == loanContractPaymentsToProcessLatestTransactionDate);
        }

        private async Task CommitActiveTransactionsAsync(IEnumerable<Transaction> freshTransactions)
        {
            var tomorrow = _currentDateTimeProvider.Now().Date.AddDays(1);
            
            var transactions = await _context.Transactions
                .Where(x => !x.IsCommitted && x.CreatedAt < tomorrow)
                .Include(x => x.SenderAccount)
                .Include(x => x.ReceiverAccount)
                .ToListAsync();

            transactions.AddRange(freshTransactions);
             
            transactions.ForEach(x => x.Commit());
        }
    }
}