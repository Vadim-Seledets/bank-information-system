using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankInformationSystem.Data.Entities
{
    public class DepositContract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid ContractNumber { get; set; }

        public DateTime ProgramStartDate { get; set; }

        public DateTime ProgramEndDate { get; set; }

        public DateTime ValidUntil { get; set; }

        public bool IsCompleted { get; set; }

        public bool IsRevoked { get; set; }

        public DateTime? CompletedAt { get; set; }

        public decimal Rate { get; set; }
        
        public decimal Amount { get; set; }
        
        public int CurrencyId { get; set; }
        
        public Currency Currency { get; set; }

        public int DepositTypeId { get; set; }
        
        public DepositType DepositType { get; set; }

        [ForeignKey(nameof(LatestInterestTransaction))]
        public int? LatestInterestTransactionId { get; set; }

        public Transaction LatestInterestTransaction { get; set; }

        [ForeignKey(nameof(RegularAccount))]
        public string RegularAccountNumber { get; set; }

        public Account RegularAccount { get; set; }

        [ForeignKey(nameof(DepositAccount))]
        public string DepositAccountNumber { get; set; }

        public Account DepositAccount { get; set; }

        public int CustomerId { get; set; }
        
        public Customer Customer { get; set; }
    }
}