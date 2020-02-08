using System.ComponentModel.DataAnnotations;

namespace BankInformationSystem.Data.Entities
{
    public class Setting
    {
        public const string DateDaysOffsetKey = "DateDaysOffset";
        
        [Key]
        public string Key { get; set; }

        public string Value { get; set; }
    }
}