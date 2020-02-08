using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Common;
using BankInformationSystem.Common.Extensions;
using BankInformationSystem.Common.Models;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Services
{
    public class BankOperationsService : IBankOperationsService
    {
        private readonly BankInformationSystemDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;
        private readonly ICurrentDateTimeProvider _currentDateTimeProvider;
        private readonly IVirtualDateTimeManager _virtualDateTimeManager;

        public BankOperationsService(
            BankInformationSystemDbContext context,
            IMapper mapper,
            IAccountService accountService,
            ICurrentDateTimeProvider currentDateTimeProvider,
            IVirtualDateTimeManager virtualDateTimeManager)
        {
            _context = context;
            _mapper = mapper;
            _accountService = accountService;
            _currentDateTimeProvider = currentDateTimeProvider;
            _virtualDateTimeManager = virtualDateTimeManager;
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
                    .ToListAsync()
            };
        }

        public async Task<IList<DepositContractShortInfoModel>> GetDepositContractsAsync()
        {
            var query = _context.DepositContracts
                .OrderByDescending(x => x.Customer.LastName)
                .ThenByDescending(x => x.Customer.FirstName)
                .ThenByDescending(x => x.Customer.MiddleName);
            var depositContracts = await _mapper
                .ProjectTo<DepositContractShortInfoModel>(query)
                .ToListAsync();

            return depositContracts;
        }

        public async Task<DepositContractDetailsModel> GetDepositContractDetailsAsync(Guid contractNumber)
        {
            var query = from contract in _context.DepositContracts.Include(x => x.Customer)
                        where contract.ContractNumber == contractNumber
                        join transaction in _context.Transactions
                            on contract.ContractNumber equals transaction.ContractNumber into contractTransactions
                        from transaction in contractTransactions.DefaultIfEmpty()
                        select new { Contract = contract, Transaction = transaction };
            var queryResult = await query.ToListAsync();

            var deposit = queryResult
                .GroupBy(
                    x => x.Contract.ContractNumber,
                    (key, value) => new { value.FirstOrDefault()?.Contract, Transactions = value.Select(x => x.Transaction).ToList() })
                .SingleOrDefault();
            if (deposit?.Contract == null)
            {
                return null;
            }

            var depositDetails = _mapper.Map<DepositContractDetailsModel>(deposit.Contract);
            depositDetails.Transactions = _mapper.Map<List<TransactionReportModel>>(deposit.Transactions);

            return depositDetails;
        }

        public async Task OpenDepositAsync(DepositCreateModel model)
        {
            var regularAccountCreateModel = _mapper.Map<CreateAccountTemplateModel>(model);
            regularAccountCreateModel.AccountActivity = AccountActivity.Passive;
            regularAccountCreateModel.AccountType = AccountType.Regular;
            var regularAccount = await _accountService.GetAccountTemplateAsync(regularAccountCreateModel);

            var depositAccountCreateModel = _mapper.Map<CreateAccountTemplateModel>(model);
            depositAccountCreateModel.AccountActivity = AccountActivity.Passive;
            depositAccountCreateModel.AccountType = AccountType.Deposit;
            var depositAccount = await _accountService.GetAccountTemplateAsync(depositAccountCreateModel);
            
            var depositContract = _context.Add(_mapper.Map<DepositContract>(model)).Entity;
            depositContract.DepositAccount = depositAccount;
            depositContract.RegularAccount = regularAccount;

            var bankDevelopmentFundAccount =
                await _accountService.GetBankDevelopmentFundAccountForCurrencyAsync(model.CurrencyId);

            var initialTransactions = new[]
            {
                new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = _currentDateTimeProvider.Now(),
                    SenderAccountNumber = BankConstants.CashDeskAccountNumber,
                    ReceiverAccountNumber = regularAccount.AccountNumber
                },
                new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = _currentDateTimeProvider.Now(),
                    SenderAccountNumber = regularAccount.AccountNumber,
                    ReceiverAccountNumber = bankDevelopmentFundAccount.AccountNumber
                }
            };

            _context.Transactions.AddRange(initialTransactions);

            await _context.SaveChangesAsync();
        }

        public async Task RevokeDepositAsync(Guid contractNumber)
        {
            var depositContract = await _context.DepositContracts.FindAsync(contractNumber);

            if (depositContract == null)
            {
                throw new ValidationException($"Contract with number {contractNumber} does not exist.");
            }
            if (depositContract.DepositTypeId != (int) MainDepositType.Revocable)
            {
                throw new ValidationException("Deposit is not revocable.");
            }
            if (depositContract.IsCompleted)
            {
                throw new ValidationException("Deposit contract has already been completed.");
            }
            if (depositContract.IsRevoked)
            {
                throw new ValidationException("Deposit contract has already been revoked.");
            }

            var bankDevelopmentFund = await _context.Accounts
                .Where(x => x.Type == AccountType.BankDevelopmentFund && x.CurrencyId == depositContract.CurrencyId)
                .SingleAsync();
            
            var returnTransaction = _context.Transactions.Add(new Transaction
            {
                ContractNumber = depositContract.ContractNumber,
                CurrencyId = depositContract.CurrencyId,
                Amount = depositContract.Amount,
                CreatedAt = _currentDateTimeProvider.Now(),
                SenderAccountNumber = bankDevelopmentFund.AccountNumber,
                ReceiverAccountNumber = depositContract.DepositAccountNumber
            });

            depositContract.IsRevoked = true;

            await _context.SaveChangesAsync();
        }

        // For system emulation purposes it will increment virtual date offset from current date
        public async Task CloseBankDayAsync(int times)
        {
            if (times <= 0)
            {
                return;
            }
            
            foreach (var i in Enumerable.Range(1, times))
            {
                var freshTransactions = await ProcessDepositsAsync();
                await CommitActiveTransactionsAsync(freshTransactions);
                await _virtualDateTimeManager.SkipDaysAsync(1);
            }

            await _virtualDateTimeManager.CommitAsync();
        }

        private async Task<IList<Transaction>> ProcessDepositsAsync()
        {
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
            
            var transactions = new List<Transaction>();

            if (depositContracts.TryGetValue((int)MainDepositType.Irrevocable, out var irrevocableDeposits))
            {
                transactions.AddRange(ProcessIrrevocableDeposits(irrevocableDeposits, bankDevelopmentFunds));
            }

            if (depositContracts.TryGetValue((int) MainDepositType.Revocable, out var revocableDeposits))
            {
                transactions.AddRange(ProcessRevocableDeposits(revocableDeposits, bankDevelopmentFunds));
            }

            return transactions;
        }

        private IList<Transaction> ProcessIrrevocableDeposits(
            IEnumerable<DepositContract> depositContracts,
            IDictionary<int, Account> bankDevelopmentFunds)
        {
            var transactions = new List<Transaction>();
            
            foreach (var depositContract in depositContracts)
            {
                var interestTransaction = new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount * depositContract.Rate 
                        * (decimal)depositContract.ProgramEndDate.DifferenceInMonths(depositContract.ProgramStartDate),
                    CreatedAt = _currentDateTimeProvider.Now(),
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.DepositAccountNumber,
                    ReceiverAccount = depositContract.DepositAccount
                };
                
                depositContract.LatestInterestTransaction = interestTransaction;
                transactions.Add(interestTransaction);

                var returnTransaction = new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = _currentDateTimeProvider.Now(),
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.DepositAccountNumber,
                    ReceiverAccount = depositContract.DepositAccount
                };
                
                transactions.Add(returnTransaction);
                depositContract.CompletedAt = _currentDateTimeProvider.Now();
                depositContract.IsCompleted = true;
            }

            return transactions;
        }
        
        private IList<Transaction> ProcessRevocableDeposits(
            IEnumerable<DepositContract> depositContracts,
            IDictionary<int, Account> bankDevelopmentFunds)
        {
            var transactions = new List<Transaction>();
            
            foreach (var depositContract in depositContracts)
            {
                var interestCalculationStartDate = depositContract.LatestInterestTransaction?.CreatedAt 
                    ?? depositContract.ProgramStartDate;
                var interestTransaction = new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount * depositContract.Rate * (decimal)_currentDateTimeProvider.Now().DifferenceInMonths(interestCalculationStartDate),
                    CreatedAt = _currentDateTimeProvider.Now(),
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.DepositAccountNumber,
                    ReceiverAccount = depositContract.DepositAccount
                };
                
                depositContract.LatestInterestTransaction = interestTransaction;
                transactions.Add(interestTransaction);

                var today = _currentDateTimeProvider.Now().Date;
                if (depositContract.ProgramEndDate != today)
                {
                    continue;
                }

                var returnTransaction = new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = _currentDateTimeProvider.Now(),
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.DepositAccountNumber,
                    ReceiverAccount = depositContract.DepositAccount
                };
                
                transactions.Add(returnTransaction);
                depositContract.CompletedAt = _currentDateTimeProvider.Now();
                depositContract.IsCompleted = true;
            }

            return transactions;
        }

        private async Task CommitActiveTransactionsAsync(IEnumerable<Transaction> freshTransactions)
        {
            var transactions = await _context.Transactions
                .Where(x => !x.IsCommitted)
                .Include(x => x.SenderAccount)
                .Include(x => x.ReceiverAccount)
                .ToListAsync();

            transactions.AddRange(freshTransactions);
             
            transactions.ForEach(x => x.Commit());

            await _context.SaveChangesAsync();
        }
    }
}