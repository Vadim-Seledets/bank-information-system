using System;
using BankInformationSystem.Business.Utilities;
using Newtonsoft.Json;

namespace BankInformationSystem.Business.Models
{
    public abstract class ProgramContractCreateBaseModel
    {
        public Guid ContractNumber { get; set; }
        
        [JsonConverter(typeof(DateTimeToDateConverter))]
        public DateTime ProgramStartDate { get; set; }

        [JsonConverter(typeof(DateTimeToDateConverter))]
        public DateTime ProgramEndDate { get; set; }
        
        [JsonConverter(typeof(DateTimeToDateConverter))]
        public DateTime ContractValidUntil { get; set; }

        public int CustomerId { get; set; }

        public decimal Amount { get; set; }

        public decimal Rate { get; set; }

        public int CurrencyId { get; set; }
    }
}