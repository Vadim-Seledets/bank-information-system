namespace BankInformationSystem.Business.Models
{
    public class IncomePerMonthModel
    {
        public int Id { get; set; }

        public decimal Amount { get; set; }

        public int CurrencyId { get; set; }
    }
}