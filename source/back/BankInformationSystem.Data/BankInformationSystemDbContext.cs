using BankInformationSystem.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Data
{
    public class BankInformationSystemDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }

        public DbSet<Contacts> Contacts { get; set; }

        public DbSet<Passport> Passports { get; set; }

        public DbSet<BirthInfo> BirthInfos { get; set; }

        public DbSet<PlaceOfLiving> PlacesOfLiving { get; set; }

        public DbSet<PlaceOfRegistration> PlaceOfRegistrations { get; set; }

        public DbSet<WorkInfo> WorkInfos { get; set; }

        public DbSet<IncomePerMonth> IncomesPerMonth { get; set; }

        public DbSet<City> Cities { get; set; }

        public DbSet<Citizenship> CountriesOfCitizenship { get; set; }

        public DbSet<Currency> Currencies { get; set; }

        public DbSet<Disability> Disabilities { get; set; }

        public DbSet<MaritalStatus> MaritalStatuses { get; set; }

        public BankInformationSystemDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}