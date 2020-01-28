namespace BankInformationSystem.Data.Entities
{
    public class IncomePerMonth
    {
        public int Id { get; set; }

        public decimal Amount { get; set; }

        public int CustomerId { get; set; }

        public Customer Customer { get; set; }

        public int CurrencyId { get; set; }

        public Currency Currency { get; set; }
    }
}