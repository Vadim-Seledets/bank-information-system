using System;
using BankInformationSystem.Business.Utilities;
using Newtonsoft.Json;

namespace BankInformationSystem.Business.Models
{
    public class BirthInfoModel
    {
        public string PlaceOfBirth { get; set; }
        
        [JsonConverter(typeof(DateTimeToDateConverter))]
        public DateTime DateOfBirth { get; set; }
    }
}