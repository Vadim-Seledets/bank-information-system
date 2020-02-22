using BankInformationSystem.Business.Models;
using FluentValidation;

namespace BankInformationSystem.Business.Validation
{
    public class MobileCarrierPaymentRequestValidator : AbstractValidator<MobileCarrierPaymentRequestModel>
    {
        public MobileCarrierPaymentRequestValidator()
        {
            RuleFor(x => x.AccountNumber)
                .NotEmpty();
            
            RuleFor(x => x.Amount)
                .GreaterThan(0);

            RuleFor(x => x.PhoneNumber)
                .Matches(ValidationConstants.PhoneNumberRegex);
        }
    }
}