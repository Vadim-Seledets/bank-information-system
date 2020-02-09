namespace BankInformationSystem.Business.Models
{
    public class LoanContractDetailsModel : ProgramContractDetailsBaseModel
    {
        public int LoanTypeId { get; set; }
        
        public string AccountNumber { get; set; }
    }
}