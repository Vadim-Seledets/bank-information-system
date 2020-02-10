using System;
using BankInformationSystem.Business.Utilities;
using Newtonsoft.Json;

namespace BankInformationSystem.Business.Models
{
    public class ProgramContractShortInfoModel
    {
        public Guid ContractNumber { get; set; }

        public CustomerShortInfoModel Customer { get; set; }
        
        [JsonConverter(typeof(DateTimeToDateConverter))]
        public DateTime ProgramStartDate { get; set; }

        [JsonConverter(typeof(DateTimeToDateConverter))]
        public DateTime ProgramEndDate { get; set; }
    }
}