using BankInformationSystem.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.DataAccess
{
    // TODO: Refactor database structure to add look-ups as required
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

        public BankInformationSystemDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}