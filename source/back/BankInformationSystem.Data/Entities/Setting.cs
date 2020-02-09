using System.ComponentModel.DataAnnotations;

namespace BankInformationSystem.Data.Entities
{
    public class Setting
    {
        [Key]
        public string Key { get; set; }

        public string Value { get; set; }
    }
}