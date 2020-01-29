using System.Collections.Generic;

namespace BankInformationSystem.Models
{
    public class ApiErrorModel
    {
        public IList<PropertyErrorModel> Errors { get; set; }

        public string Error { get; set; }
    }
}