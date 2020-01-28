namespace BankInformationSystem.Data.Entities
{
    public class WorkInfo
    {
        public int Id { get; set; }

        public string Company { get; set; }

        public string Position { get; set; }

        public int CustomerId { get; set; }

        public Customer Customer { get; set; }
    }
}