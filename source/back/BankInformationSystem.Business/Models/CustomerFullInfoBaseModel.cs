using BankInformationSystem.Common.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace BankInformationSystem.Business.Models
{
    public abstract class CustomerFullInfoBaseModel
    {
        public string FirstName { get; set; }

        public string MiddleName { get; set; }
        
        public string LastName { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }

        public bool IsRetired { get; set; }

        public bool IsLiableForMilitaryService { get; set; }

        public PassportModel Passport { get; set; }
        
        public BirthInfoModel BirthInfo { get; set; }
        
        public AddressModel PlaceOfLiving { get; set; }

        public AddressModel PlaceOfRegistration { get; set; }

        public ContactsModel Contacts { get; set; }

        public IncomePerMonthModel IncomePerMonth { get; set; }

        public WorkInfoModel WorkInfo { get; set; }

        public int? DisabilityId { get; set; }

        public int MaritalStatusId { get; set; }
    }
}