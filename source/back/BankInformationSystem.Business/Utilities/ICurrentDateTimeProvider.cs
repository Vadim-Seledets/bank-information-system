using System;

namespace BankInformationSystem.Business.Utilities
{
    public interface ICurrentDateTimeProvider
    {
        DateTime Now();
    }
}