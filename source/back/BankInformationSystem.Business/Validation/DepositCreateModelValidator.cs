using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Data;
using FluentValidation;

namespace BankInformationSystem.Business.Validation
{
    public class DepositCreateModelValidator : ProgramContractValidatorBase<DepositCreateModel>
    {
        private const int MinimalDepositAmount = 50;
        private const int MaximalDepositRate = 1;

        public DepositCreateModelValidator(
            BankInformationSystemDbContext context,
            ICurrentDateTimeProvider currentDateTimeProvider)
            : base(context, currentDateTimeProvider)
        {
            RuleFor(x => x.Amount)
                .GreaterThanOrEqualTo(MinimalDepositAmount)
                .WithMessage($"'{{PropertyName}}' must be at least {MinimalDepositAmount} currency units.");

            RuleFor(x => x.Rate)
                .ExclusiveBetween(0, MaximalDepositRate)
                .WithMessage($"'{{PropertyName}}' must be a positive number less than {MaximalDepositRate}");
        }
    }
}