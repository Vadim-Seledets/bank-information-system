using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;

namespace BankInformationSystem.Business.Services
{
    public interface IDepositService
    {
        Task<IList<DepositContractShortInfoModel>> GetDepositContractsAsync();

        Task<DepositContractDetailsModel> GetDepositContractDetailsAsync(Guid contractNumber);

        Task OpenDepositAsync(DepositCreateModel model);

        Task RevokeDepositAsync(Guid contractNumber);
    }
}