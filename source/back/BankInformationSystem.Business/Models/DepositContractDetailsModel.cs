using System;
using System.Collections.Generic;

namespace BankInformationSystem.Business.Models
{
    public class DepositContractDetailsModel
    {
        public Guid ContractNumber { get; set; }

        public DateTime ProgramStartDate { get; set; }

        public DateTime ProgramEndDate { get; set; }

        public DateTime ValidUntil { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime? CompletedAt { get; set; }

        public decimal Rate { get; set; }
        
        public decimal Amount { get; set; }
        
        public int CurrencyId { get; set; }

        public int DepositTypeId { get; set; }
        
        public string RegularAccountNumber { get; set; }
        
        public string DepositAccountNumber { get; set; }

        public CustomerShortInfoModel Customer { get; set; }

        public IList<TransactionReportModel> Transactions { get; set; }
    }
}