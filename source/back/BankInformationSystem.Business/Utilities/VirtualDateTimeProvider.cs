using System;
using System.Linq;
using System.Threading.Tasks;
using BankInformationSystem.Common;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Utilities
{
    public class VirtualDateTimeProvider : ICurrentDateTimeProvider, IVirtualDateTimeManager
    {
        private readonly BankInformationSystemDbContext _context;
        private readonly Lazy<Task<Setting>> _offsetSettingTaskLazy;

        public VirtualDateTimeProvider(BankInformationSystemDbContext context)
        {
            _context = context;
            _offsetSettingTaskLazy = new Lazy<Task<Setting>>(GetDaysOffsetSettingAsync);
        }
        
        public DateTime Now()
        {
            var offsetSetting = Task.Run(async () => await _offsetSettingTaskLazy.Value).Result;

            var now = DateTime.UtcNow.AddDays(int.Parse(offsetSetting.Value));

            return now;
        }

        public async Task<int> GetUtcOffsetAsync()
        {
            var offsetSetting = await _offsetSettingTaskLazy.Value;

            return int.Parse(offsetSetting.Value);
        }

        public async Task SkipDaysAsync(int days)
        {
            var offsetSetting = await _offsetSettingTaskLazy.Value;
            
            offsetSetting.Value = (int.Parse(offsetSetting.Value) + days).ToString();
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }

        private async Task<Setting> GetDaysOffsetSettingAsync()
        {
            var cachedOffsetSetting = _context.Settings.Local
                .SingleOrDefault(x => x.Key == BankConstants.Settings.DateDaysOffsetKey);
            var offsetSetting = cachedOffsetSetting 
                ?? await _context.Settings.SingleAsync(x => x.Key == BankConstants.Settings.DateDaysOffsetKey);

            return offsetSetting;
        }
    }
}