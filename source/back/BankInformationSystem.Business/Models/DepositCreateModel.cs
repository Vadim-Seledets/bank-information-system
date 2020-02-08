using System;
using BankInformationSystem.Business.Utilities;
using Newtonsoft.Json;

namespace BankInformationSystem.Business.Models
{
    public class DepositCreateModel
    {
        public Guid ContractNumber { get; set; }
        
        [JsonConverter(typeof(DateTimeToDateConverter))]
        public DateTime ProgramStartDate { get; set; }

        [JsonConverter(typeof(DateTimeToDateConverter))]
        public DateTime ProgramEndDate { get; set; }
        
        [JsonConverter(typeof(DateTimeToDateConverter))]
        public DateTime ContractValidUntil { get; set; }

        public int CustomerId { get; set; }

        public int DepositTypeId { get; set; }

        public decimal DepositAmount { get; set; }

        public decimal DepositRate { get; set; }

        public int CurrencyId { get; set; }
    }
}