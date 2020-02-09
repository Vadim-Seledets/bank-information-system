namespace BankInformationSystem.Data.Entities
{
    public class IncomePerMonth
    {
        public int Id { get; set; }

        public decimal Amount { get; set; }

        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; }

        public int CurrencyId { get; set; }

        public virtual Currency Currency { get; set; }
    }
}