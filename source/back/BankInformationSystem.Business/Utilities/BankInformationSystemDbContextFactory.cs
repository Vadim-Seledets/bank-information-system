using System;
using BankInformationSystem.Data;

namespace BankInformationSystem.Business.Utilities
{
    public class BankInformationSystemDbContextFactory : IBankInformationSystemDbContextFactory
    {
        private readonly Func<BankInformationSystemDbContext> _factory;

        public BankInformationSystemDbContextFactory(Func<BankInformationSystemDbContext> factory)
        {
            _factory = factory;
        }
        
        public BankInformationSystemDbContext New()
        {
            return _factory.Invoke();
        }
    }
}