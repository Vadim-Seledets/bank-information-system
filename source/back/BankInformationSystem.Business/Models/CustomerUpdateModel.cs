using System.Text.Json.Serialization;

namespace BankInformationSystem.Business.Models
{
    public class CustomerUpdateModel : CustomerFullInfoBaseModel
    {
        [JsonIgnore]
        public int Id { get; set; }
    }
}