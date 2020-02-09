using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankInformationSystem.Data.Entities
{
    // TODO: Use "Table per Type" approach instead of "Table per Hierarchy"
    public class LoanContract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid ContractNumber { get; set; }

        public DateTime ProgramStartDate { get; set; }

        public DateTime ProgramEndDate { get; set; }

        public DateTime ValidUntil { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime? CompletedAt { get; set; }

        public decimal Rate { get; set; }
        
        public decimal Amount { get; set; }
        
        public int CurrencyId { get; set; }
        
        public virtual Currency Currency { get; set; }

        public int LoadTypeId { get; set; }
        
        public virtual LoanType LoanType { get; set; }
        
        public int? LatestPaymentTransactionId { get; set; }

        public virtual Transaction LatestPaymentTransaction { get; set; }

        [ForeignKey(nameof(RegularAccount))]
        public string RegularAccountNumber { get; set; }

        public virtual Account RegularAccount { get; set; }

        [ForeignKey(nameof(LoanPaymentAccount))]
        public string LoanPaymentAccountNumber { get; set; }

        public virtual Account LoanPaymentAccount { get; set; }

        public int CustomerId { get; set; }
        
        public virtual Customer Customer { get; set; }
    }
}