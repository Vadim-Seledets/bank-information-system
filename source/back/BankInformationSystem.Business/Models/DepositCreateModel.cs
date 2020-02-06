using System;

namespace BankInformationSystem.Business.Models
{
    public class DepositCreateModel
    {
        public Guid ContractNumber { get; set; }

        public int CustomerId { get; set; }

        public int DepositTypeId { get; set; }

        public decimal DepositAmount { get; set; }

        public decimal DepositRate { get; set; }

        public int CurrencyId { get; set; }
        
        public DateTime ProgramStartDate { get; set; }

        public DateTime ProgramEndDate { get; set; }

        public DateTime ContractValidUntil { get; set; }
    }
}