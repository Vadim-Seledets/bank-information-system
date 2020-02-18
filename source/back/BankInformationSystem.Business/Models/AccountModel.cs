using BankInformationSystem.Common.Models;

namespace BankInformationSystem.Business.Models
{
    public class AccountModel
    {
        public string AccountNumber { get; set; }

        public AccountActivity Activity { get; set; }

        public AccountType Type { get; set; }

        public int CurrencyId { get; set; }

        public decimal Debit { get; set; }

        public decimal Credit { get; set; }

        public int? CustomerId { get; set; }
        
        public decimal NetBalance => Activity == AccountActivity.Active ? Debit - Credit : Credit - Debit;
    }
}