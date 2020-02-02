using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankInformationSystem.Data.Entities
{
    public class Transaction
    {
        public int Id { get; set; }

        public int CurrencyId { get; set; }

        public Currency Currency { get; set; }

        public decimal Amount { get; set; }

        public DateTime CreatedAt { get; set; }
        
        [ForeignKey(nameof(SenderAccount))]
        public string SenderAccountNumber { get; set; }

        public Account SenderAccount { get; set; }
        
        [ForeignKey(nameof(ReceiverAccount))]
        public string ReceiverAccountNumber { get; set; }

        public Account ReceiverAccount { get; set; }
    }
}