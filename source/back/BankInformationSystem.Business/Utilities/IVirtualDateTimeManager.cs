using System.Threading.Tasks;

namespace BankInformationSystem.Business.Utilities
{
    public interface IVirtualDateTimeManager
    {
        Task SkipDaysAsync(int days);
    }
}