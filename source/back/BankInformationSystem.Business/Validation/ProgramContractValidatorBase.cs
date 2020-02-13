using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Validation
{
    public abstract class ProgramContractValidatorBase<T> : AbstractValidator<T> where T : ProgramContractCreateBaseModel
    {
        protected readonly BankInformationSystemDbContext Context;
        protected readonly ICurrentDateTimeProvider CurrentDateTimeProvider;

        public ProgramContractValidatorBase(
            BankInformationSystemDbContext context,
            ICurrentDateTimeProvider currentDateTimeProvider)
        {
            Context = context;
            CurrentDateTimeProvider = currentDateTimeProvider;
            
            RuleFor(x => x.ContractNumber)
                .MustAsync(BeUniqueContractNumberAsync)
                .WithMessage("Contract with specified id already exists.");
            
            RuleFor(x => x.ProgramStartDate)
                .Must(BeTodayDateOrLater)
                .WithMessage("'{PropertyName}' must be a today or a later date.");
            
            RuleFor(x => x.ProgramEndDate)
                .GreaterThanOrEqualTo(x => x.ProgramStartDate.AddDays(30).Date)
                .WithMessage("Program term must be at least 30 days.");
            
            RuleFor(x => x.ContractValidUntil)
                .GreaterThanOrEqualTo(x => x.ProgramEndDate.Date)
                .WithMessage("'{PropertyName}' must be a program end date or a later date.");

            RuleFor(x => x.CustomerId)
                .MustAsync(BeIdOfExistingCustomerAsync)
                .WithMessage("Specified customer does not exist.");
        }
        
        protected async Task<bool> BeUniqueContractNumberAsync(Guid contractNumber, CancellationToken token)
        {
            var depositContractsQuery = Context.DepositContracts.Where(x => x.ContractNumber == contractNumber).Select(x => x.ContractNumber);
            var loanContractsQuery = Context.LoanContracts.Where(x => x.ContractNumber == contractNumber).Select(x => x.ContractNumber);
            var unionQuery = depositContractsQuery.Union(loanContractsQuery).Distinct();
            
            return !await unionQuery.AnyAsync(token);
        }

        protected async Task<bool> BeIdOfExistingCustomerAsync(int customerId, CancellationToken token)
        {
            return await Context.Customers.AnyAsync(x => x.Id == customerId && !x.IsDeleted, token);
        }

        protected bool BeTodayDateOrLater(DateTime dateTime)
        {
            return dateTime >= CurrentDateTimeProvider.Now().Date;
        }
    }
}