using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;

namespace BankInformationSystem.Business.Services
{
    public interface IBankOperationsService
    {
        Task<IList<DepositContractShortInfoModel>> GetDepositContractsAsync();

        Task<DepositContractDetailsModel> GetDepositContractDetailsAsync(Guid contractNumber);
        
        Task<BankOperationAuxiliaryInfo> GetBankOperationsAuxiliaryInfoAsync();

        Task OpenDepositAsync(DepositCreateModel model);

        Task RevokeDepositAsync(Guid contractNumber);

        Task CloseBankDayAsync(int times);
    }
}