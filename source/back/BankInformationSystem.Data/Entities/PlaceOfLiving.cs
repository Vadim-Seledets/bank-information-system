namespace BankInformationSystem.Data.Entities
{
    public class PlaceOfLiving
    {
        public int Id { get; set; }

        public string Address { get; set; }
        
        public int CustomerId { get; set; }

        public Customer Customer { get; set; }

        public int CityId { get; set; }

        public City City { get; set; }
    }
}