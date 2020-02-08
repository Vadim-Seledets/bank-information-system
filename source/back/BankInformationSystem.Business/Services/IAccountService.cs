using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Data.Entities;

namespace BankInformationSystem.Business.Services
{
    public interface IAccountService
    {
        Task InitializeBankDevelopmentFundsAsync();
        
        Task<Account> GetAccountTemplateAsync(CreateAccountTemplateModel model);

        Task<Account> GetBankDevelopmentFundAccountForCurrencyAsync(int currencyId);
    }
}