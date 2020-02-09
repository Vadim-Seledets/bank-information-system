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

namespace BankInformationSystem.Business.Services
{
    public class BankOperationsService : IBankOperationsService
    {
        private readonly BankInformationSystemDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentDateTimeProvider _currentDateTimeProvider;
        private readonly IVirtualDateTimeManager _virtualDateTimeManager;

        public BankOperationsService(
            BankInformationSystemDbContext context,
            IMapper mapper,
            ICurrentDateTimeProvider currentDateTimeProvider,
            IVirtualDateTimeManager virtualDateTimeManager)
        {
            _context = context;
            _mapper = mapper;
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

        // For system emulation purposes it will increment virtual date offset from current date
        public async Task CloseBankDayAsync(int times)
        {
            if (times <= 0)
            {
                return;
            }
            
            foreach (var _ in Enumerable.Range(1, times))
            {
                var freshTransactions = await ProcessDepositsAsync();
                await CommitActiveTransactionsAsync(freshTransactions);
                await _virtualDateTimeManager.SkipDaysAsync(1);
            }
            
            await _context.SaveChangesAsync();
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
                var interestTransaction = _context.Transactions.Add(new Transaction
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
                }).Entity;
                
                depositContract.LatestInterestTransaction = interestTransaction;
                transactions.Add(interestTransaction);

                var returnTransaction = _context.Transactions.Add(new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = _currentDateTimeProvider.Now(),
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.RegularAccountNumber,
                    ReceiverAccount = depositContract.RegularAccount
                }).Entity;
                
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
                var interestTransaction = _context.Transactions.Add(new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount * depositContract.Rate * (decimal)_currentDateTimeProvider.Now().DifferenceInMonths(interestCalculationStartDate),
                    CreatedAt = _currentDateTimeProvider.Now(),
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.DepositAccountNumber,
                    ReceiverAccount = depositContract.DepositAccount
                }).Entity;
                
                depositContract.LatestInterestTransaction = interestTransaction;
                transactions.Add(interestTransaction);

                var today = _currentDateTimeProvider.Now().Date;
                if (depositContract.ProgramEndDate != today)
                {
                    continue;
                }

                var returnTransaction = _context.Transactions.Add(new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = _currentDateTimeProvider.Now(),
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    SenderAccount = bankDevelopmentFunds[depositContract.CurrencyId],
                    ReceiverAccountNumber = depositContract.RegularAccountNumber,
                    ReceiverAccount = depositContract.RegularAccount
                }).Entity;
                
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
        }
    }
}