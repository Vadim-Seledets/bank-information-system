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

        public DepositType Type { get; set; }

        public DateTime ProgramStartDate { get; set; }

        public DateTime ProgramEndDate { get; set; }

        public DateTime ValidUntil { get; set; }

        public decimal Rate { get; set; }

        [ForeignKey(nameof(RegularAccount))]
        public string RegularAccountNumber { get; set; }

        public Account RegularAccount { get; set; }

        [ForeignKey(nameof(DepositAccount))]
        public string DepositAccountNumber { get; set; }

        public Account DepositAccount { get; set; }
    }
}