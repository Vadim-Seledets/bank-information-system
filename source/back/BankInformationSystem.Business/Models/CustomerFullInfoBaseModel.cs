using BankInformationSystem.Common.Models;

namespace BankInformationSystem.Business.Models
{
    public abstract class CustomerFullInfoBaseModel
    {
        public string FirstName { get; set; }

        public string MiddleName { get; set; }
        
        public string LastName { get; set; }

        public GenderId GenderId { get; set; }

        public DisabilityId? Disability { get; set; }

        public bool IsRetired { get; set; }

        public bool IsLiableForMilitaryService { get; set; }

        public PassportModel Passport { get; set; }
        
        public BirthInfoModel BirthInfo { get; set; }

        public AddressModel PlaceOfLiving { get; set; }

        public AddressModel PlaceOfRegistration { get; set; }

        public ContactsModel Contacts { get; set; }
    }
}