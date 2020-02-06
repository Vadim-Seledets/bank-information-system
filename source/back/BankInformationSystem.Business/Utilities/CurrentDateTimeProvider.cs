using System;

namespace BankInformationSystem.Business.Utilities
{
    public class CurrentDateTimeProvider : ICurrentDateTimeProvider
    {
        public DateTime Now()
        {
            return DateTime.UtcNow;
        }
    }
}