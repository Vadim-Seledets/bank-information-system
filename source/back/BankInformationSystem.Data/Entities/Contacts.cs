namespace BankInformationSystem.Data.Entities
{
    public class Contacts
    {
        public int Id { get; set; }
        
        public string Email { get; set; }

        public string HomePhoneNumber { get; set; }

        public string MobilePhoneNumber { get; set; }
        
        public int CustomerId { get; set; }

        public Customer Customer { get; set; }
    }
}