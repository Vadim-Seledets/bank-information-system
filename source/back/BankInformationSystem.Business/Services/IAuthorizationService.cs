using System.Threading.Tasks;

namespace BankInformationSystem.Business.Services
{
    public interface IAuthorizationService
    {
        Task AuthorizeForAtmActionsAsync(string accountNumber, string pinHash);
    }
}