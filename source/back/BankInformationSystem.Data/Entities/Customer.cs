using BankInformationSystem.Common.Models;

namespace BankInformationSystem.DataAccess.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; }

        public string MiddleName { get; set; }
        
        public string LastName { get; set; }

        public GenderId GenderId { get; set; }

        public DisabilityId? Disability { get; set; }

        public bool IsRetired { get; set; }

        public bool IsLiableForMilitaryService { get; set; }

        public Passport Passport { get; set; }
        
        public BirthInfo BirthInfo { get; set; }
        
        public PlaceOfLiving PlaceOfLiving { get; set; }

        public PlaceOfRegistration PlaceOfRegistration { get; set; }

        public Contacts Contacts { get; set; }
    }
}