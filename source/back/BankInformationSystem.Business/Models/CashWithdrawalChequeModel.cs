using System;

namespace BankInformationSystem.Business.Models
{
    public class CashWithdrawalChequeModel
    {
        public string AccountNumber { get; set; }

        public decimal Amount { get; set; }

        public int CurrencyId { get; set; }

        public DateTime WithdrawnAt { get; set; }
    }
}