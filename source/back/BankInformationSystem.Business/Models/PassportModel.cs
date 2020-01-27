using System;

namespace BankInformationSystem.Business.Models
{
    public class PassportModel
    {
        public string Citizenship { get; set; }

        public string Series { get; set; }

        public string PassportNumber { get; set; }

        public string IssuedBy { get; set; }

        public DateTime IssuedAt { get; set; }

        public string IdNumber { get; set; }
    }
}