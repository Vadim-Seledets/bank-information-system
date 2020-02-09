using System;

namespace BankInformationSystem.Common.Extensions
{
    public static class DateTimeExtensions
    {
        public static double DifferenceInMonths(this DateTime date, DateTime anotherDate)
        {
            return Math.Abs(date.Subtract(anotherDate).TotalDays / 30);
        }
    }
}