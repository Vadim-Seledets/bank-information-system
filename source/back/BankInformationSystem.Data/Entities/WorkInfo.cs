using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankInformationSystem.DataAccess.Entities
{
    public class WorkInfo
    {
        [Key]
        [ForeignKey(nameof(Customer))]
        public int CustomerId { get; set; }

        public string Company { get; set; }

        public string Position { get; set; }

        public Customer Customer { get; set; }
    }
}