using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankInformationSystem.DataAccess.Entities
{
    public class Passport
    {
        [Key]
        [ForeignKey(nameof(Customer))]
        public int CustomerId { get; set; }

        public string Citizenship { get; set; }

        public string Series { get; set; }

        public string PassportNumber { get; set; }

        public string IssuingAuthority { get; set; }

        public DateTime IssuedAt { get; set; }

        public string IdNumber { get; set; }
        
        public Customer Customer { get; set; }
    }
}