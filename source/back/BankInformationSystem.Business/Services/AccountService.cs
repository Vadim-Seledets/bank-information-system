using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Common;
using BankInformationSystem.Common.Models;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Services
{
    public class AccountService : IAccountService
    {
        private const decimal InitialBankDevelopmentFundAmount = 100_000M;
        
        private readonly IDictionary<int, decimal> _bankDevelopmentFundsInitialAmounts = new Dictionary<int, decimal>
        {
            { (int)MainCurrency.BYN, 100_000_000_000M }
        };
            
        private readonly IDictionary<AccountType, int> _balanceAccountNumbers = new Dictionary<AccountType, int>
        {
            { AccountType.Regular, 3014 },
            { AccountType.LoanPayment, 2400 },
            { AccountType.Deposit, 1672 },
            { AccountType.BankDevelopmentFund, 7327 }
        };

        private readonly BankInformationSystemDbContext _context;
        private readonly IBankInformationSystemDbContextFactory _contextFactory;
        private readonly ICurrentDateTimeProvider _currentDateTimeProvider;
        private readonly IPinGenerator _pinGenerator;
        private readonly IMapper _mapper;

        public AccountService(
            BankInformationSystemDbContext context,
            IBankInformationSystemDbContextFactory contextFactory,
            ICurrentDateTimeProvider currentDateTimeProvider,
            IPinGenerator pinGenerator,
            IMapper mapper)
        {
            _context = context;
            _contextFactory = contextFactory;
            _currentDateTimeProvider = currentDateTimeProvider;
            _pinGenerator = pinGenerator;
            _mapper = mapper;
        }

        public async Task InitializeBankDevelopmentFundsAsync()
        {
            var currenciesWithoutBankAccount =
                await (from currency in _context.Currencies
                join account in _context.Accounts.Where(x => x.Type == AccountType.BankDevelopmentFund)
                    on currency.Id equals account.CurrencyId into currencyAccounts
                from account in currencyAccounts.DefaultIfEmpty()
                where account == null
                select currency).ToListAsync();

            foreach (var currency in currenciesWithoutBankAccount)
            {
                try
                {
                    var createAccountTemplateModel = new CreateAccountTemplateModel
                    {
                        AccountActivity = AccountActivity.Passive,
                        AccountType = AccountType.BankDevelopmentFund
                    };
                    var (account, _) = await GetAccountTemplateAsync(createAccountTemplateModel);
                    account.Credit = _bankDevelopmentFundsInitialAmounts.TryGetValue(currency.Id, out var initialAmount)
                        ? initialAmount
                        : InitialBankDevelopmentFundAmount;
                    account.CurrencyId = currency.Id;

                    _context.Add(account);
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    // TODO: Log
                    Console.Error.WriteLine($"Bank Development Fund for currency {currency.Code} can't be created");
                }
            }
        }

        public async Task<AccountModel> GetAccountWithActualizedBalanceAsync(string accountNumber)
        {
            // To avoid unwanted side effects
            var context = _contextFactory.New();
            
            var account = await context.Accounts.FindAsync(accountNumber);
            if (account == null)
            {
                throw new ValidationException($"Account with id {accountNumber} doesn't exist");
            }

            var now = _currentDateTimeProvider.Now();
            
            var notCommittedTransactions = await context.Transactions
                .Include(x => x.ReceiverAccount)
                .Include(x => x.SenderAccount)
                .Where(x => !x.IsCommitted && x.CreatedAt <= now
                    && (x.SenderAccountNumber == accountNumber || x.ReceiverAccountNumber == accountNumber))
                .ToListAsync();
            notCommittedTransactions.ForEach(x => x.Commit());
            
            return _mapper.Map<AccountModel>(account);
        }

        public async Task<Account> GetBankDevelopmentFundAccountForCurrencyAsync(int currencyId)
        {
            var account = await _context.Accounts
                .Where(x => x.Type == AccountType.BankDevelopmentFund && x.CurrencyId == currencyId)
                .FirstAsync();

            return account;
        }

        public async Task<AccountBalanceModel> GetAccountBalanceAsync(string accountNumber)
        {
            var account = await GetAccountWithActualizedBalanceAsync(accountNumber);

            return _mapper.Map<AccountBalanceModel>(account);
        }

        public async Task<CashWithdrawalChequeModel> WithdrawCashAsync(string accountNumber, decimal amount)
        {
            var withdrawTransaction = await TransferMoneyAsync(accountNumber, BankConstants.CashDeskAccountNumber, amount);

            return _mapper.Map<CashWithdrawalChequeModel>(withdrawTransaction);
        }

        public async Task<(Account Account, string Pin)> GetAccountTemplateAsync(CreateAccountTemplateModel model)
        {
            var newAccountNumber = await NewAccountNumberAsync(model.AccountType, model.CustomerId);
            var (pin, pinHash) = _pinGenerator.CreatePin();

            var account = new Account
            {
                AccountNumber = newAccountNumber,
                Activity = model.AccountActivity,
                PinHash = pinHash,
                Type = model.AccountType,
                CustomerId = model.CustomerId,
                CurrencyId = model.CurrencyId
            };

            return (account, pin);
        }
        
        public async Task<Transaction> TransferMoneyAsync(
            string senderAccountNumber,
            string receiverAccountNumber,
            decimal amount,
            bool allowNegativeBalance = false)
        {
            if (amount <= 0)
            {
                throw new ValidationException("Only positive currency amount could be transferred.");
            }
            
            var actualizedAccountModel = await GetAccountWithActualizedBalanceAsync(senderAccountNumber);
            if (!allowNegativeBalance && actualizedAccountModel.NetBalance < amount)
            {
                throw new ValidationException("Cash amount to transfer exceeds account's balance.");
            }

            if (receiverAccountNumber != null)
            {
                var receiverExists = await _context.Accounts.FindAsync(receiverAccountNumber);
                if (receiverExists == null)
                {
                    throw new ValidationException("Receiver account doesn't exist.");
                }
            }

            var withdrawalTransaction = _context.Add(new Transaction
            {
                CurrencyId = actualizedAccountModel.CurrencyId,
                Amount = amount,
                CreatedAt = _currentDateTimeProvider.Now(),
                SenderAccountNumber = senderAccountNumber,
                ReceiverAccountNumber = receiverAccountNumber
            }).Entity;

            await _context.SaveChangesAsync();

            return withdrawalTransaction;
        }

        private async Task<string> NewAccountNumberAsync(AccountType accountType, int? customerId)
        {
            var balanceAccountNumber = _balanceAccountNumbers[accountType];
            var customerAccountNumber = await _context.Accounts.CountAsync(x => x.CustomerId == customerId) + 1;
            
            if (customerId == null)
            {
                customerId = BankConstants.CustomerIdForBank;
            }
            
            var checksum = (balanceAccountNumber + customerId + customerAccountNumber) % 10;

            var accountNumber = balanceAccountNumber.ToString().PadLeft(4, '0')
                + customerId.ToString().PadLeft(5, '0')
                + customerAccountNumber.ToString().PadLeft(3, '0')
                + checksum;

            return accountNumber;
        }
    }
}