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
        private readonly IVirtualDateTimeManager _virtualDateTimeManager;
        private readonly DateTime _now;

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
            _virtualDateTimeManager = virtualDateTimeManager;
            _now = currentDateTimeProvider.Now(); // Assuming that BankOperationsService is per request dependency
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
                        group new { Contract = contract, Transaction = transaction } by contract into contractTransactionsGroup
                        select new
                        {
                            Contract = contractTransactionsGroup.Key,
                            Transactions = contractTransactionsGroup.Select(x => x.Transaction)
                        };

            var deposits = await query.SingleOrDefaultAsync();
            if (deposits?.Contract == null)
            {
                return null;
            }

            var depositDetails = _mapper.Map<DepositContractDetailsModel>(deposits.Contract);
            depositDetails.Transactions = _mapper.Map<List<TransactionReportModel>>(deposits.Transactions);

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
                    CreatedAt = _now,
                    SenderAccountNumber = BankConstants.CashDeskAccountNumber,
                    ReceiverAccountNumber = regularAccount.AccountNumber
                },
                new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = _now,
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
                CreatedAt = _now,
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
            }

            await _virtualDateTimeManager.SkipDaysAsync(times);
        }

        private async Task<IList<Transaction>> ProcessDepositsAsync()
        {
            var today = _now.Date;
            var isLastDayOfMonth = DateTime.DaysInMonth(today.Year, today.Month) == today.Day;

            var bankDevelopmentFunds = await _context.Accounts
                .Where(x => x.Type == AccountType.BankDevelopmentFund)
                .ToDictionaryAsync(x => x.CurrencyId, x => x);

            // Process irrevocable deposits at ProgramEndDate,
            // process revocable deposits at ProgramEndDate and the last day of each month
            var depositContracts = await _context.DepositContracts
                .Where(x => !x.IsCompleted && !x.IsRevoked && x.ProgramStartDate.Date < today && x.ProgramEndDate.Date >= today)
                .Where(x => x.DepositTypeId == (int)MainDepositType.Irrevocable && x.ProgramEndDate == today
                    || x.DepositTypeId == (int)MainDepositType.Revocable && (x.ProgramEndDate == today || isLastDayOfMonth))
                .GroupBy(x => x.DepositTypeId)
                .ToDictionaryAsync(x => x.Key, x => x.ToList());
            
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
                    CreatedAt = _now,
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    ReceiverAccountNumber = depositContract.DepositAccountNumber
                };
                
                depositContract.LatestInterestTransaction = interestTransaction;
                transactions.Add(interestTransaction);

                var returnTransaction = new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = _now,
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    ReceiverAccountNumber = depositContract.DepositAccountNumber
                };
                
                transactions.Add(returnTransaction);
                depositContract.CompletedAt = _now;
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
                    Amount = depositContract.Amount * depositContract.Rate * (decimal)_now.DifferenceInMonths(interestCalculationStartDate),
                    CreatedAt = _now,
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    ReceiverAccountNumber = depositContract.DepositAccountNumber
                };
                
                depositContract.LatestInterestTransaction = interestTransaction;
                transactions.Add(interestTransaction);

                var today = _now.Date;
                if (depositContract.ProgramEndDate != today)
                {
                    continue;
                }

                var returnTransaction = new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = _now,
                    SenderAccountNumber = bankDevelopmentFunds[depositContract.CurrencyId].AccountNumber,
                    ReceiverAccountNumber = depositContract.DepositAccountNumber
                };
                
                transactions.Add(returnTransaction);
                depositContract.CompletedAt = _now;
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