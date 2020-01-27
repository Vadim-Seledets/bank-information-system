using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankInformationSystem.DataAccess.Entities
{
    public class BirthInfo
    {
        [Key]
        [ForeignKey(nameof(Customer))]
        public int CustomerId { get; set; }

        public string PlaceOfBirth { get; set; }
        
        public DateTime DateOfBirth { get; set; }
        
        public Customer Customer { get; set; }
    }
}