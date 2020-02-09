using System;

namespace BankInformationSystem.Business.Models
{
    public class TransactionReportModel
    {
        public int CurrencyId { get; set; }

        public decimal Amount { get; set; }

        public DateTime CreatedAt { get; set; }
        
        public string SenderAccountNumber { get; set; }
        
        public string ReceiverAccountNumber { get; set; }
    }
}