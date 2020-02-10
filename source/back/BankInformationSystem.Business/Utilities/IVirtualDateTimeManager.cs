using System.Threading.Tasks;

namespace BankInformationSystem.Business.Utilities
{
    public interface IVirtualDateTimeManager
    {
        Task<int> GetUtcOffsetAsync();
            
        Task SkipDaysAsync(int days);

        Task CommitAsync();
    }
}