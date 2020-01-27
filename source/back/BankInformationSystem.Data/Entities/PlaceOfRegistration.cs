using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankInformationSystem.DataAccess.Entities
{
    public class PlaceOfRegistration
    {
        [Key]
        [ForeignKey(nameof(Customer))]
        public int CustomerId { get; set; }
        
        public string City { get; set; }

        public string Address { get; set; }

        public Customer Customer { get; set; }
    }
}