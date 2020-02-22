using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Data.Entities;

namespace BankInformationSystem.Business.Services
{
    public interface IAccountService
    {
        Task InitializeBankDevelopmentFundsAsync();

        Task<AccountBalanceModel> GetAccountBalanceAsync(string accountNumber);

        Task<CashWithdrawalChequeModel> WithdrawCashAsync(string accountNumber, decimal amount);
        
        Task<AccountModel> GetAccountWithActualizedBalanceAsync(string accountNumber);
        
        Task<(Account Account, string Pin)> GetAccountTemplateAsync(CreateAccountTemplateModel model);

        Task<Account> GetBankDevelopmentFundAccountForCurrencyAsync(int currencyId);

        Task<Transaction> TransferMoneyAsync(string senderAccountNumber, string receiverAccountNumber, decimal amount, bool allowNegativeBalance = false);
    }
}