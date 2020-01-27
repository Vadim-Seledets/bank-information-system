using System.Collections.Generic;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;

namespace BankInformationSystem.Business.Services
{
    public interface ICustomerService
    {
        Task<IList<CustomerShortInfoModel>> GetCustomersAsync();

        Task<CustomerFullInfoModel> GetCustomerByIdAsync(int id);

        Task<int> CreateCustomerAsync(CustomerCreateUpdateModel model);

        Task UpdateCustomerAsync(int id, CustomerCreateUpdateModel model);

        Task DeleteCustomerAsync(int id);
    }
}