using System.Collections.Generic;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;

namespace BankInformationSystem.Business.Services
{
    public interface ICustomerService
    {
        Task<IList<CustomerShortInfoModel>> GetCustomersAsync();

        Task<CustomerFullInfoModel> GetCustomerByIdAsync(int id);

        Task<CustomerAuxiliaryInfo> GetCustomerAuxiliaryInfoAsync();

        Task<int> CreateCustomerAsync(CustomerCreateModel model);

        Task UpdateCustomerAsync(CustomerUpdateModel model);

        Task DeleteCustomerAsync(int id);
    }
}