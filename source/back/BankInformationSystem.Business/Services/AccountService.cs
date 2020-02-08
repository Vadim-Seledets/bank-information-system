using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Common.Models;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
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
            { AccountType.Credit, 2400 },
            { AccountType.Deposit, 1672 },
            { AccountType.BankDevelopmentFund, 7327 }
        };

        private readonly BankInformationSystemDbContext _context;

        public AccountService(BankInformationSystemDbContext context)
        {
            _context = context;
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
                    var account = await GetAccountTemplateAsync(createAccountTemplateModel);
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

        public async Task<Account> GetBankDevelopmentFundAccountForCurrencyAsync(int currencyId)
        {
            var account = await _context.Accounts
                .Where(x => x.Type == AccountType.BankDevelopmentFund && x.CurrencyId == currencyId)
                .FirstAsync();

            return account;
        }

        public async Task<Account> GetAccountTemplateAsync(CreateAccountTemplateModel model)
        {
            var newAccountNumber = await NewAccountNumberAsync(model.AccountType, model.CustomerId);

            return new Account
            {
                AccountNumber = newAccountNumber,
                Activity = model.AccountActivity,
                Type = model.AccountType,
                CustomerId = model.CustomerId,
                CurrencyId = model.CurrencyId
            };
        }

        private async Task<string> NewAccountNumberAsync(AccountType accountType, int? customerId)
        {
            var balanceAccountNumber = _balanceAccountNumbers[accountType];
            var customerAccountNumber = await _context.Accounts.CountAsync(x => x.CustomerId == customerId) + 1;
            
            if (customerId == null)
            {
                customerId = 0; // Bank account
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