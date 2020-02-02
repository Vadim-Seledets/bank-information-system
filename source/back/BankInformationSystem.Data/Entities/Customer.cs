using BankInformationSystem.Common.Models;

namespace BankInformationSystem.Data.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; }

        public string MiddleName { get; set; }
        
        public string LastName { get; set; }

        public Gender Gender { get; set; }

        public bool IsRetired { get; set; }

        public bool IsLiableForMilitaryService { get; set; }

        public Passport Passport { get; set; }
        
        public BirthInfo BirthInfo { get; set; }
        
        public PlaceOfLiving PlaceOfLiving { get; set; }

        public PlaceOfRegistration PlaceOfRegistration { get; set; }
        
        public IncomePerMonth IncomePerMonth { get; set; }

        public WorkInfo WorkInfo { get; set; }

        public Contacts Contacts { get; set; }

        public int DisabilityId { get; set; }

        public Disability Disability { get; set; }

        public int MaritalStatusId { get; set; }

        public MaritalStatus MaritalStatus { get; set; }
    }
}