using System;
using System.Linq;
using System.Threading.Tasks;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Utilities
{
    public class VirtualDateTimeProvider : ICurrentDateTimeProvider, IVirtualDateTimeManager
    {
        private readonly BankInformationSystemDbContext _context;

        public VirtualDateTimeProvider(BankInformationSystemDbContext context)
        {
            _context = context;
        }
        
        public DateTime Now()
        {
            var cachedOffsetSetting = _context.Settings.Local
                .SingleOrDefault(x => x.Key == Setting.DateDaysOffsetKey);
            var offsetSetting = cachedOffsetSetting ?? _context.Settings
                .Single(x => x.Key == Setting.DateDaysOffsetKey);

            var now = DateTime.UtcNow.AddDays(int.Parse(offsetSetting.Value));

            return now;
        }

        public async Task SkipDaysAsync(int days)
        {
            var cachedOffsetSetting = _context.Settings.Local
                .SingleOrDefault(x => x.Key == Setting.DateDaysOffsetKey);
            var offsetSetting = cachedOffsetSetting 
                ?? await _context.Settings
                    .SingleAsync(x => x.Key == Setting.DateDaysOffsetKey);

            offsetSetting.Value = (int.Parse(offsetSetting.Value) + days).ToString();
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}