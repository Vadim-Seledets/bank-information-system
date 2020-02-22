using System;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using BankInformationSystem.Data;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly BankInformationSystemDbContext _context;

        public AuthorizationService(BankInformationSystemDbContext context)
        {
            _context = context;
        }
        
        public async Task AuthorizeForAtmActionsAsync(string accountNumber, string pinHash)
        {
            var validPin = await _context.Accounts
                .Where(x => x.AccountNumber == accountNumber)
                .Select(x => x.PinHash)
                .SingleOrDefaultAsync();

            if (pinHash == null || !validPin.Equals(pinHash, StringComparison.InvariantCulture))
            {
                throw new AuthenticationException("Invalid credentials provided");
            }
        }
    }
}