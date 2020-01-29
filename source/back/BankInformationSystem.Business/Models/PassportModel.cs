using System;

namespace BankInformationSystem.Business.Models
{
    public class PassportModel
    {
        public int CitizenshipId { get; set; }

        public string Series { get; set; }

        public string PassportNumber { get; set; }

        public string IssuingAuthority { get; set; }

        public DateTime IssuedAt { get; set; }

        public string IdNumber { get; set; }
    }
}