using System;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Data;
using FluentValidation;
using Microsoft.Extensions.Configuration;

namespace BankInformationSystem.Business.Validation
{
    public class LoanCreateModelValidator : ProgramContractValidatorBase<LoanCreateModel>
    {
        private const int MinimalLoanAmount = 50;
        private const decimal MinimalLoanRate = 0.1M;
        
        private readonly IConfiguration _configuration;

        public LoanCreateModelValidator(
            BankInformationSystemDbContext context,
            ICurrentDateTimeProvider currentDateTimeProvider,
            IConfiguration configuration)
            : base(context, currentDateTimeProvider)
        {
            _configuration = configuration;
            
            RuleFor(x => x.Amount)
                .GreaterThanOrEqualTo(MinimalLoanAmount)
                .WithMessage($"'{{PropertyName}}' must be at least {MinimalLoanAmount} currency units.");

            RuleFor(x => x.Rate)
                .GreaterThanOrEqualTo(MinimalLoanRate)
                .WithMessage($"'{{PropertyName}}' must be greater than or equal to {MinimalLoanRate}");

            RuleFor(x => x.ProgramEndDate)
                .Must(BeNDaysLaterThanProgramStartDateWhereNIsMultipleOfLoanTermDays)
                .WithMessage($"Difference between program end and start dates must be a multiple of {_configuration.GetValue<int>("LoanTermDays")}");
        }
        
        private bool BeNDaysLaterThanProgramStartDateWhereNIsMultipleOfLoanTermDays(LoanCreateModel model, DateTime endDate)
        {
            return (int) Math.Floor(endDate.Subtract(model.ProgramStartDate).TotalDays) %
                _configuration.GetValue<int>("LoanTermDays") == 0;
        }
    }
}