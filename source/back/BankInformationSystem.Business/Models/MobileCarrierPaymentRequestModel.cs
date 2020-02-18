using Newtonsoft.Json;

namespace BankInformationSystem.Business.Models
{
    public class MobileCarrierPaymentRequestModel
    {
        public string AccountNumber { get; set; }
        
        public string PhoneNumber { get; set; }

        public decimal Amount { get; set; }

        public int CurrencyId { get; set; }

        public int CarrierId { get; set; }
    }
}