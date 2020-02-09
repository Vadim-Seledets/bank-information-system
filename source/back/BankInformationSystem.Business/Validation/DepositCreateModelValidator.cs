using System;
using System.Threading;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Validation
{
    public class DepositCreateModelValidator : AbstractValidator<DepositCreateModel>
    {
        private const int MinimalDepositAmount = 50;
        private const int MaximalDepositRate = 1;
        
        private readonly BankInformationSystemDbContext _context;
        private readonly ICurrentDateTimeProvider _currentDateTimeProvider;

        public DepositCreateModelValidator(BankInformationSystemDbContext context, ICurrentDateTimeProvider currentDateTimeProvider)
        {
            _context = context;
            _currentDateTimeProvider = currentDateTimeProvider;

            RuleFor(x => x.ContractNumber)
                .MustAsync(BeUniqueContractNumber)
                .WithMessage("Deposit contract with specified id already exists.");
            
            RuleFor(x => x.ProgramStartDate)
                .Must(BeTodayDateOrLater)
                .WithMessage("'{PropertyName}' must be a today or a later date.");

            RuleFor(x => x.ProgramEndDate)
                .GreaterThanOrEqualTo(x => x.ProgramStartDate.AddDays(30).Date)
                .WithMessage("Deposit period must be at least 30 days.");

            RuleFor(x => x.ContractValidUntil)
                .GreaterThanOrEqualTo(x => x.ProgramEndDate.Date)
                .WithMessage("'{PropertyName}' must be a deposit end date or a later date.");

            RuleFor(x => x.CustomerId)
                .MustAsync(BeIdOfExistingCustomer)
                .WithMessage("Specified customer does not exist.");

            RuleFor(x => x.DepositAmount)
                .GreaterThanOrEqualTo(MinimalDepositAmount)
                .WithMessage($"'{{PropertyName}}' must be at least {MinimalDepositAmount} currency units.");

            RuleFor(x => x.DepositRate)
                .InclusiveBetween(0, MaximalDepositRate)
                .WithMessage($"'{{PropertyName}}' must be a positive number less than {MaximalDepositRate}");
        }
        
        private async Task<bool> BeUniqueContractNumber(Guid contractNumber, CancellationToken token)
        {
            return !await _context.DepositContracts.AnyAsync(x => x.ContractNumber == contractNumber, token);
        }

        private bool BeTodayDateOrLater(DateTime dateTime)
        {
            return dateTime >= _currentDateTimeProvider.Now().Date;
        }

        private async Task<bool> BeIdOfExistingCustomer(int customerId, CancellationToken token)
        {
            return await _context.Customers.AnyAsync(x => x.Id == customerId, token);
        }
    }
}