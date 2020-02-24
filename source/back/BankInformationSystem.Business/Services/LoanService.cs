using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Common.Models;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Services
{
    public class LoanService : ILoanService
    {
        private readonly BankInformationSystemDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;
        private readonly ICurrentDateTimeProvider _currentDateTimeProvider;
        private readonly IValidator<LoanCreateModel> _loanCreateModelValidator;

        public LoanService(
            BankInformationSystemDbContext context,
            IMapper mapper,
            IAccountService accountService,
            ICurrentDateTimeProvider currentDateTimeProvider,
            IValidator<LoanCreateModel> loanCreateModelValidator)
        {
            _context = context;
            _mapper = mapper;
            _accountService = accountService;
            _currentDateTimeProvider = currentDateTimeProvider;
            _loanCreateModelValidator = loanCreateModelValidator;
        }
        
        public async Task<IList<ProgramContractShortInfoModel>> GetLoanContractsAsync()
        {
            var query = _context.LoanContracts
                .Where(x => !x.Customer.IsDeleted)
                .OrderByDescending(x => x.Customer.LastName)
                .ThenByDescending(x => x.Customer.FirstName)
                .ThenByDescending(x => x.Customer.MiddleName);
            var loanContracts = await _mapper
                .ProjectTo<ProgramContractShortInfoModel>(query)
                .ToListAsync();

            return loanContracts;
        }

        public async Task<LoanContractDetailsModel> GetLoanContractDetailsAsync(Guid contractNumber)
        {
            var query = from contract in _context.LoanContracts.Include(x => x.Customer)
                        where !contract.Customer.IsDeleted
                        where contract.ContractNumber == contractNumber
                        join transaction in _context.Transactions
                            on contract.ContractNumber equals transaction.ContractNumber into contractTransactions
                        from transaction in contractTransactions.DefaultIfEmpty()
                        select new { Contract = contract, Transaction = transaction };
            var queryResult = await query.ToListAsync();

            var loan = queryResult
                .GroupBy(
                    x => x.Contract.ContractNumber,
                    (key, value) => new { value.FirstOrDefault()?.Contract, Transactions = value.Select(x => x.Transaction).ToList() })
                .SingleOrDefault();
            if (loan?.Contract == null)
            {
                return null;
            }

            var loanDetails = _mapper.Map<LoanContractDetailsModel>(loan.Contract);
            loanDetails.Transactions = _mapper.Map<List<TransactionReportModel>>(loan.Transactions);

            return loanDetails;
        }

        public async Task<CreateLoanResponseModel> CreateLoanAsync(LoanCreateModel model)
        {
            await _loanCreateModelValidator.ValidateAndThrowAsync(model);
            
            var regularAccountCreateModel = _mapper.Map<CreateAccountTemplateModel>(model);
            regularAccountCreateModel.AccountActivity = AccountActivity.Active;
            regularAccountCreateModel.AccountType = AccountType.Regular;
            var (regularAccount, regularAccountPin) = await _accountService.GetAccountTemplateAsync(regularAccountCreateModel);

            var loanPaymentAccountCreateModel = _mapper.Map<CreateAccountTemplateModel>(model);
            loanPaymentAccountCreateModel.AccountActivity = AccountActivity.Active;
            loanPaymentAccountCreateModel.AccountType = AccountType.LoanPayment;
            var (loanPaymentAccount, loanPaymentAccountPin) = await _accountService.GetAccountTemplateAsync(loanPaymentAccountCreateModel);
            
            var loanContract = _context.Add(_mapper.Map<LoanContract>(model)).Entity;
            loanContract.LoanPaymentAccount = loanPaymentAccount;
            loanContract.RegularAccount = regularAccount;

            var bankDevelopmentFundAccount = 
                await _accountService.GetBankDevelopmentFundAccountForCurrencyAsync(model.CurrencyId);

            var loanTransaction = new Transaction
            {
                ContractNumber = loanContract.ContractNumber,
                CurrencyId = loanContract.CurrencyId,
                Amount = loanContract.Amount,
                CreatedAt = loanContract.ProgramStartDate,
                SenderAccountNumber = bankDevelopmentFundAccount.AccountNumber,
                ReceiverAccountNumber = regularAccount.AccountNumber
            };

            _context.Transactions.Add(loanTransaction);

            await _context.SaveChangesAsync();

            return new CreateLoanResponseModel
            {
                RegularAccountPin = regularAccountPin,
                LoanPaymentAccountPin =  loanPaymentAccountPin
            };
        }
    }
}