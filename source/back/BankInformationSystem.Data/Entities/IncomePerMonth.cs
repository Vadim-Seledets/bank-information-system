using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BankInformationSystem.Common.Models;

namespace BankInformationSystem.DataAccess.Entities
{
    public class IncomePerMonth
    {
        [Key]
        [ForeignKey(nameof(Customer))]
        public int CustomerId { get; set; }

        public decimal Amount { get; set; }

        public CurrencyId CurrencyId { get; set; }

        public Customer Customer { get; set; }
    }
}