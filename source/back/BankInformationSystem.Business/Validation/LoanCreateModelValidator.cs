using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Data;
using FluentValidation;

namespace BankInformationSystem.Business.Validation
{
    public class LoanCreateModelValidator : ProgramContractValidatorBase<LoanCreateModel>
    {
        private const int MinimalLoanAmount = 50;
        private const decimal MinimalLoanRate = 0.1M;

        public LoanCreateModelValidator(
            BankInformationSystemDbContext context,
            ICurrentDateTimeProvider currentDateTimeProvider)
            : base(context, currentDateTimeProvider)
        {
            RuleFor(x => x.Amount)
                .GreaterThanOrEqualTo(MinimalLoanAmount)
                .WithMessage($"'{{PropertyName}}' must be at least {MinimalLoanAmount} currency units.");

            RuleFor(x => x.Rate)
                .GreaterThanOrEqualTo(MinimalLoanRate)
                .WithMessage($"'{{PropertyName}}' must be greater than or equal to {MinimalLoanRate}");
        }
    }
}