namespace BankInformationSystem.Business.Models
{
    public class LoanContractDetailsModel : ProgramContractDetailsBaseModel
    {
        public int LoanTypeId { get; set; }
        
        public string LoanPaymentAccountNumber { get; set; }
    }
}