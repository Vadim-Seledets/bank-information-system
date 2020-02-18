using System.Threading.Tasks;
using BankInformationSystem.Business.Models;

namespace BankInformationSystem.Business.Services
{
    public interface IBankMetaOperationsService
    {
        Task<BankOperationAuxiliaryInfo> GetBankOperationsAuxiliaryInfoAsync();

        Task CloseBankDayAsync(int times);
    }
}