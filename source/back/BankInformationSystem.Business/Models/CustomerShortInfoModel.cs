using BankInformationSystem.Common.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace BankInformationSystem.Business.Models
{
    public class CustomerShortInfoModel
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; }

        public string MiddleName { get; set; }
        
        public string LastName { get; set; }

        public string Email { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }
    }
}