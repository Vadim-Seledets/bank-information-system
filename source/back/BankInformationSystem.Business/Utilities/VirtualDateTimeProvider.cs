using System;
using System.Linq;
using System.Threading.Tasks;
using BankInformationSystem.Data;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Utilities
{
    public class VirtualDateTimeProvider : ICurrentDateTimeProvider, IVirtualDateTimeManager
    {
        private const string DateDaysOffsetKey = "DateDaysOffet";
         
        private readonly BankInformationSystemDbContext _context;

        public VirtualDateTimeProvider(BankInformationSystemDbContext context)
        {
            _context = context;
        }
        
        public DateTime Now()
        {
            var offsetString = _context.Settings
                .Where(x => x.Key == DateDaysOffsetKey)
                .Select(x => x.Value)
                .Single();
            var now = DateTime.UtcNow.AddDays(int.Parse(offsetString));

            return now;
        }

        public async Task SkipDaysAsync(int days)
        {
            var offsetSetting = await _context.Settings
                .Where(x => x.Key == DateDaysOffsetKey)
                .SingleAsync();

            offsetSetting.Value = (int.Parse(offsetSetting.Value) + days).ToString();

            await _context.SaveChangesAsync();
        }
    }
}