namespace BankInformationSystem.Business.Models
{
    public class DepositContractDetailsModel : ProgramContractDetailsBaseModel
    {
        public bool IsRevoked { get; set; }
        
        public int DepositTypeId { get; set; }
        
        public string LoanPaymentAccountNumber { get; set; }
    }
}