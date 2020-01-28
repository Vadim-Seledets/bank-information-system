using System;

namespace BankInformationSystem.Data.Entities
{
    public class BirthInfo
    {
        public int Id { get; set; }
        
        public string PlaceOfBirth { get; set; }
        
        public DateTime DateOfBirth { get; set; }

        public int CustomerId { get; set; }
        
        public Customer Customer { get; set; }
    }
}