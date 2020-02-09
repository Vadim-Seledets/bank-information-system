using BankInformationSystem.Common.Models;

namespace BankInformationSystem.Business.Models
{
    public class CreateAccountTemplateModel
    {
        public AccountActivity AccountActivity { get; set; }

        public AccountType AccountType { get; set; }

        public int? CustomerId { get; set; }

        public int CurrencyId { get; set; }
    }
}