using BankInformationSystem.Business.Models;
using BankInformationSystem.Data;
using FluentValidation;

namespace BankInformationSystem.Business.Validation
{
    public class CustomerUpdateModelValidator : CustomerFullInfoBaseModelValidator<CustomerUpdateModel>
    {
        public CustomerUpdateModelValidator(BankInformationSystemDbContext context) : base(context)
        {
            RuleFor(x => x)
                .MustAsync(async (customer, passport, token) => await HaveUniqueNameAsync(passport, customer.Id, token))
                .WithMessage("Customer with specified name already exists.");
            RuleFor(x => x.Passport)
                .MustAsync(async (customer, passport, token) => await HaveUniqueFullPassportNumberAsync(passport, customer.Id, token))
                .WithMessage("Customer with specified passport already exists.");
            RuleFor(x => x.Passport)
                .MustAsync(async (customer, passport, token) => await HaveUniqueIdNumberAsync(passport, customer.Id, token))
                .WithMessage("Customer with specified id number already exists.");
        }
    }
}