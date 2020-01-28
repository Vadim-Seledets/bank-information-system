using BankInformationSystem.Data.Entities;
using FluentValidation;

namespace BankInformationSystem.Business.Validation
{
    public class CustomerValidator : AbstractValidator<Customer>
    {
        public CustomerValidator()
        {
            // RuleFor(x => x.FirstName).NotEmpty();
            // RuleFor(x => x.LastName).NotEmpty();
            // RuleFor(x => x.MiddleName).NotEmpty();
            //
            // RuleFor(x => x.Passport).NotNull();
            // RuleFor(x => x.Passport.Series).NotEmpty();
            // RuleFor(x => x.Passport.PassportNumber).NotEmpty();
            // RuleFor(x => x.Passport.IssuingAuthority).NotEmpty();
            // RuleFor(x => x.Passport.IdNumber).NotEmpty();
            //
            // RuleFor(x => x.BirthInfo).NotEmpty();
            // RuleFor(x => x.BirthInfo.PlaceOfBirth).NotEmpty();
            //
            // RuleFor(x => x.PlaceOfLiving).NotEmpty();
            // RuleFor(x => x.PlaceOfLiving).NotEmpty();
            
            // TODO: Finish validation rules
        }
    }
}