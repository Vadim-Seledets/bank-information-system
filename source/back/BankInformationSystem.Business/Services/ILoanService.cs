using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;

namespace BankInformationSystem.Business.Services
{
    public interface ILoanService
    {
        Task<IList<ProgramContractShortInfoModel>> GetLoanContractsAsync();

        Task<LoanContractDetailsModel> GetLoanContractDetailsAsync(Guid contractNumber);

        Task<CreateLoanResponseModel> CreateLoanAsync(LoanCreateModel model);
    }
}