using BankInformationSystem.Data;

namespace BankInformationSystem.Business.Utilities
{
    public interface IBankInformationSystemDbContextFactory
    {
        BankInformationSystemDbContext New();
    }
}