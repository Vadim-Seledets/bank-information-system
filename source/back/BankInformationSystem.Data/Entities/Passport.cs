using System;

namespace BankInformationSystem.Data.Entities
{
    public class Passport
    {
        public int Id { get; set; }

        public string Series { get; set; }

        public string PassportNumber { get; set; }

        public string IssuingAuthority { get; set; }

        public DateTime IssuedAt { get; set; }

        public string IdNumber { get; set; }
        
        public int CustomerId { get; set; }
        
        public Customer Customer { get; set; }

        public int CitizenshipId { get; set; }

        public Citizenship Citizenship { get; set; }
    }
}