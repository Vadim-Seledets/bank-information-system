using System;

namespace BankInformationSystem.Business.Models
{
    public class ProgramContractShortInfoModel
    {
        public Guid ContractNumber { get; set; }

        public CustomerShortInfoModel Customer { get; set; }

        public DateTime ProgramStartDate { get; set; }

        public DateTime ProgramEndDate { get; set; }
    }
}