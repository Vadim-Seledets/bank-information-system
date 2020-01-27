using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankInformationSystem.DataAccess.Entities
{
    public class Contacts
    {
        [Key]
        [ForeignKey(nameof(Customer))]
        public int CustomerId { get; set; }
        
        public string Email { get; set; }

        public string HomePhoneNumber { get; set; }

        public string MobilePhoneNumber { get; set; }

        public Customer Customer { get; set; }
    }
}