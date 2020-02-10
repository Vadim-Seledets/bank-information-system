using System.Collections.Generic;
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

        public bool IsDeleted { get; set; }

        public virtual Passport Passport { get; set; }
        
        public virtual BirthInfo BirthInfo { get; set; }
        
        public virtual PlaceOfLiving PlaceOfLiving { get; set; }

        public virtual PlaceOfRegistration PlaceOfRegistration { get; set; }
        
        public virtual IncomePerMonth IncomePerMonth { get; set; }

        public virtual WorkInfo WorkInfo { get; set; }

        public virtual Contacts Contacts { get; set; }

        public int DisabilityId { get; set; }

        public virtual Disability Disability { get; set; }

        public int MaritalStatusId { get; set; }

        public virtual MaritalStatus MaritalStatus { get; set; }
        
        public virtual ICollection<Account> Accounts { get; set; }
    }
}