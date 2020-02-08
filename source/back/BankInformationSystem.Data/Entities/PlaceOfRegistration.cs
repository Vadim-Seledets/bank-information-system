namespace BankInformationSystem.Data.Entities
{
    public class PlaceOfRegistration
    {
        public int Id { get; set; }

        public string Address { get; set; }
        
        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; }

        public int CityId { get; set; }

        public virtual City City { get; set; }
    }
}