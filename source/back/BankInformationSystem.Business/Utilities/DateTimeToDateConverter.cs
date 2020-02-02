using Newtonsoft.Json.Converters;

namespace BankInformationSystem.Business.Utilities
{
    public class DateTimeToDateConverter : IsoDateTimeConverter
    {
        public DateTimeToDateConverter()
        {
            DateTimeFormat = "yyyy-MM-dd";
        }
    }
}