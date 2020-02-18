using System;

namespace BankInformationSystem.Business.Models
{
    public class MobileCarrierPaymentChequeModel
    {
        public string AccountNumber { get; set; }

        public decimal Amount { get; set; }

        public int CurrencyId { get; set; }

        public int CarrierId { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime PayedAt { get; set; }
    }
}