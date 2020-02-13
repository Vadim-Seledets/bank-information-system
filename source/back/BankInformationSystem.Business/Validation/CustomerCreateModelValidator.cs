using BankInformationSystem.Business.Models;
using BankInformationSystem.Data;
using FluentValidation;

namespace BankInformationSystem.Business.Validation
{
    public class CustomerCreateModelValidator : CustomerFullInfoBaseModelValidator<CustomerCreateModel>
    {
        public CustomerCreateModelValidator(BankInformationSystemDbContext context) : base(context)
        {
            RuleFor(x => x)
                .MustAsync(async (passport, token) => await HaveUniqueNameAsync(passport, token: token))
                .WithMessage("Customer with specified name already exists.");
            RuleFor(x => x.Passport)
                .MustAsync(async (passport, token) => await HaveUniqueFullPassportNumberAsync(passport, token: token))
                .WithMessage("Customer with specified passport already exists.");
            RuleFor(x => x.Passport)
                .MustAsync(async (passport, token) => await HaveUniqueIdNumberAsync(passport, token: token))
                .WithMessage("Customer with specified id number already exists.");
        }
    }
}