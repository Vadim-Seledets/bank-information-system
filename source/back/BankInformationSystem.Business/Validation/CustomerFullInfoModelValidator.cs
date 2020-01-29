using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Validation
{
    public class CustomerFullInfoBaseModelValidator : AbstractValidator<CustomerFullInfoBaseModel>
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
            RuleFor(x => x.Passport)
                .MustAsync(HaveUniqueFullPassportNumber)
                .When(x => x is CustomerCreateModel)
                .WithMessage("Customer with specified passport already exists.");
            RuleFor(x => x.Passport)
                .MustAsync(HaveUniqueIdNumber)
                .When(x => x is CustomerCreateModel)
                .WithMessage("Customer with specified id number already exists.");
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
                .NotNull();

            RuleFor(x => x.PlaceOfLiving)
                .NotNull();
            RuleFor(x => x.PlaceOfLiving.Address)
                .NotNull();
            
            RuleFor(x => x.PlaceOfRegistration)
                .NotNull();
            RuleFor(x => x.PlaceOfRegistration.Address)
                .NotNull();
            
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
                .NotNull()
                .When(x => x.WorkInfo != null);
            RuleFor(x => x.WorkInfo.Position)
                .NotNull()
                .When(x => x.WorkInfo != null);
            
            RuleFor(x => x)
                .MustAsync(HaveUniqueName)
                .When(x => x is CustomerCreateModel)
                .WithMessage("Customer with specified name already exists.");
        }

        private async Task<bool> HaveUniqueName(CustomerFullInfoBaseModel model, CancellationToken token)
        {
            return !await _context.Customers
                .Where(x => x.FirstName == model.FirstName
                    && x.LastName == model.LastName
                    && x.MiddleName == model.MiddleName)
                .AnyAsync(token);
        }
        
        private async Task<bool> HaveUniqueFullPassportNumber(PassportModel model, CancellationToken token)
        {
            return !await _context.Customers
                .Where(x => x.Passport.Series == model.Series
                    && x.Passport.PassportNumber == model.PassportNumber)
                .AnyAsync(token);
        }
        
        private async Task<bool> HaveUniqueIdNumber(PassportModel model, CancellationToken token)
        {
            return !await _context.Customers
                .Where(x => x.Passport.Series == model.Series
                    && x.Passport.IdNumber == model.IdNumber)
                .AnyAsync(token);
        }
    }
}