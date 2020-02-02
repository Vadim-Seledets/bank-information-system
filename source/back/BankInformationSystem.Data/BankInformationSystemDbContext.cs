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

        public DbSet<Account> Accounts { get; set; }

        public DbSet<DepositType> DepositTypes { get; set; }

        public DbSet<DepositContract> DepositContracts { get; set; }

        public DbSet<Setting> Settings { get; set; }

        public DbSet<Transaction> Transactions { get; set; }

        public BankInformationSystemDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<DepositType>().HasData(
                new DepositType { Id = 1, Name = "Revocable" },
                new DepositType { Id = 2, Name = "Irrevocable" });

            modelBuilder.Entity<Currency>().HasData(
                new Currency { Id = 1, Code = "BYN" },
                new Currency { Id = 2, Code = "RUB" },
                new Currency { Id = 3, Code = "UAH" },
                new Currency { Id = 4, Code = "EUR" },
                new Currency { Id = 5, Code = "USD" });
            
            modelBuilder.Entity<Citizenship>().HasData(
                new Citizenship { Id = 1, Country = "Belarus" },
                new Citizenship { Id = 2, Country = "Russia" },
                new Citizenship { Id = 3, Country = "Ukraine" });

            modelBuilder.Entity<City>().HasData(
                new City { Id = 1, Name = "Minsk" },
                new City { Id = 2, Name = "Vitebsk" },
                new City { Id = 3, Name = "Mogilev" },
                new City { Id = 4, Name = "Gomel" },
                new City { Id = 5, Name = "Brest" },
                new City { Id = 6, Name = "Grodno" },
                new City { Id = 7, Name = "Moscow" },
                new City { Id = 8, Name = "Saint Petersburg" },
                new City { Id = 9, Name = "Kiev" },
                new City { Id = 10, Name = "Kharkiv" },
                new City { Id = 11, Name = "Dnipropetrovsk" },
                new City { Id = 12, Name = "Odessa" },
                new City { Id = 13, Name = "Vinnytsia" });
            
            modelBuilder.Entity<Disability>().HasData(
                new Disability { Id = 1, Description = "Physical" },
                new Disability { Id = 2, Description = "Visual" },
                new Disability { Id = 3, Description = "Hearing" },
                new Disability { Id = 4, Description = "Mental" },
                new Disability { Id = 5, Description = "Intellectual" },
                new Disability { Id = 6, Description = "Learning" });
            
            modelBuilder.Entity<MaritalStatus>().HasData(
                new MaritalStatus { Id = 1, Description = "Married" },
                new MaritalStatus { Id = 2, Description = "Widowed" },
                new MaritalStatus { Id = 3, Description = "Divorced" },
                new MaritalStatus { Id = 4, Description = "Single" });
        }
    }
}