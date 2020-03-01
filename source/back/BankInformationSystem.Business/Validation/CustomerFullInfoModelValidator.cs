using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Validation
{
    public abstract class CustomerFullInfoBaseModelValidator<T> : AbstractValidator<T>
        where T : CustomerFullInfoBaseModel
    {
        private readonly BankInformationSystemDbContext _context;

        public CustomerFullInfoBaseModelValidator(BankInformationSystemDbContext context)
        {
            _context = context;

            RuleFor(x => x.FirstName)
                .NotEmpty()
                .Matches(ValidationConstants.NameRegex);
            RuleFor(x => x.LastName)
                .NotEmpty()
                .Matches(ValidationConstants.NameRegex);
            RuleFor(x => x.MiddleName)
                .NotEmpty()
                .Matches(ValidationConstants.NameRegex);
            
            RuleFor(x => x.Passport)
                .NotNull();
            RuleFor(x => x.Passport.Series)
                .NotEmpty();
            RuleFor(x => x.Passport.IdNumber)
                .NotEmpty();
            RuleFor(x => x.Passport.IssuingAuthority)
                .NotEmpty();
            RuleFor(x => x.Passport.PassportNumber)
                .NotEmpty();

            RuleFor(x => x.BirthInfo)
                .NotNull();
            RuleFor(x => x.BirthInfo.PlaceOfBirth)
                .NotEmpty();

            RuleFor(x => x.PlaceOfLiving)
                .NotNull();
            RuleFor(x => x.PlaceOfLiving.Address)
                .NotEmpty();
            
            RuleFor(x => x.PlaceOfRegistration)
                .NotNull();
            RuleFor(x => x.PlaceOfRegistration.Address)
                .NotEmpty();
            
            RuleFor(x => x.Contacts)
                .NotNull();
            RuleFor(x => x.Contacts.Email)
                .EmailAddress().When(x => x.Contacts?.Email != null);
            RuleFor(x => x.Contacts.HomePhoneNumber)
                .Matches(ValidationConstants.PhoneNumberRegex)
                .When(x => x.Contacts?.HomePhoneNumber != null);
            RuleFor(x => x.Contacts.MobilePhoneNumber)
                .Matches(ValidationConstants.PhoneNumberRegex)
                .When(x => x.Contacts?.MobilePhoneNumber != null);

            RuleFor(x => x.IncomePerMonth.Amount)
                .GreaterThanOrEqualTo(0)
                .When(x => x.IncomePerMonth != null);

            RuleFor(x => x.WorkInfo.Company)
                .NotEmpty()
                .When(x => x.WorkInfo != null);
            RuleFor(x => x.WorkInfo.Position)
                .NotEmpty()
                .When(x => x.WorkInfo != null);
        }

        protected async Task<bool> HaveUniqueNameAsync(
            CustomerFullInfoBaseModel model,
            int? customerId = null,
            CancellationToken token = default)
        {
            return !await _context.Customers
                .Where(x => !x.IsDeleted && x.Id != customerId
                    && x.FirstName == model.FirstName
                    && x.LastName == model.LastName
                    && x.MiddleName == model.MiddleName)
                .AnyAsync(token);
        }
        
        protected async Task<bool> HaveUniqueFullPassportNumberAsync(
            PassportModel model,
            int? customerId = null,
            CancellationToken token = default)
        {
            return !await _context.Customers
                .Where(x => !x.IsDeleted && x.Id != customerId)
                .Where(x => x.Passport.Series == model.Series
                    && x.Passport.PassportNumber == model.PassportNumber)
                .AnyAsync(token);
        }
        
        protected async Task<bool> HaveUniqueIdNumberAsync(
            PassportModel model,
            int? customerId = null,
            CancellationToken token = default)
        {
            return !await _context.Customers
                .Where(x => !x.IsDeleted && x.Id != customerId)
                .Where(x => x.Passport.IdNumber == model.IdNumber)
                .AnyAsync(token);
        }
    }
}