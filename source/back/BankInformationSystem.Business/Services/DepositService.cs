using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Common;
using BankInformationSystem.Common.Models;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Services
{
    public class DepositService : IDepositService
    {
        private readonly BankInformationSystemDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;
        private readonly ICurrentDateTimeProvider _currentDateTimeProvider;
        private readonly IValidator<DepositCreateModel> _depositCreateModelValidator;

        public DepositService(
            BankInformationSystemDbContext context,
            IMapper mapper,
            IAccountService accountService,
            ICurrentDateTimeProvider currentDateTimeProvider,
            IValidator<DepositCreateModel> depositCreateModelValidator)
        {
            _context = context;
            _mapper = mapper;
            _accountService = accountService;
            _currentDateTimeProvider = currentDateTimeProvider;
            _depositCreateModelValidator = depositCreateModelValidator;
        }
        
        public async Task<IList<ProgramContractShortInfoModel>> GetDepositContractsAsync()
        {
            var query = _context.DepositContracts
                .Where(x => !x.Customer.IsDeleted)
                .OrderByDescending(x => x.Customer.LastName)
                .ThenByDescending(x => x.Customer.FirstName)
                .ThenByDescending(x => x.Customer.MiddleName);
            var depositContracts = await _mapper
                .ProjectTo<ProgramContractShortInfoModel>(query)
                .ToListAsync();

            return depositContracts;
        }

        public async Task<DepositContractDetailsModel> GetDepositContractDetailsAsync(Guid contractNumber)
        {
            var now = _currentDateTimeProvider.Now();
            
            var query = from contract in _context.DepositContracts.Include(x => x.Customer)
                        where !contract.Customer.IsDeleted
                        where contract.ContractNumber == contractNumber
                        join transaction in _context.Transactions.Where(x => x.CreatedAt <= now)
                            on contract.ContractNumber equals transaction.ContractNumber into contractTransactions
                        from transaction in contractTransactions.DefaultIfEmpty()
                        select new { Contract = contract, Transaction = transaction };
            var queryResult = await query.ToListAsync();

            var deposit = queryResult
                .GroupBy(
                    x => x.Contract.ContractNumber,
                    (key, value) => new { value.FirstOrDefault()?.Contract, Transactions = value.Select(x => x.Transaction).Where(x => x != null).ToList() })
                .SingleOrDefault();
            if (deposit?.Contract == null)
            {
                return null;
            }

            var depositDetails = _mapper.Map<DepositContractDetailsModel>(deposit.Contract);
            depositDetails.Transactions = _mapper.Map<List<TransactionReportModel>>(deposit.Transactions);

            return depositDetails;
        }

        public async Task<OpenDepositResponseModel> OpenDepositAsync(DepositCreateModel model)
        {
            await _depositCreateModelValidator.ValidateAndThrowAsync(model);
            
            var regularAccountCreateModel = _mapper.Map<CreateAccountTemplateModel>(model);
            regularAccountCreateModel.AccountActivity = AccountActivity.Passive;
            regularAccountCreateModel.AccountType = AccountType.Regular;
            var (regularAccount, regularAccountPin) = await _accountService.GetAccountTemplateAsync(regularAccountCreateModel);

            var depositAccountCreateModel = _mapper.Map<CreateAccountTemplateModel>(model);
            depositAccountCreateModel.AccountActivity = AccountActivity.Passive;
            depositAccountCreateModel.AccountType = AccountType.Deposit;
            var (depositAccount, depositAccountPin) = await _accountService.GetAccountTemplateAsync(depositAccountCreateModel);
            
            var depositContract = _context.Add(_mapper.Map<DepositContract>(model)).Entity;
            depositContract.DepositAccount = depositAccount;
            depositContract.RegularAccount = regularAccount;

            var bankDevelopmentFundAccount =
                await _accountService.GetBankDevelopmentFundAccountForCurrencyAsync(model.CurrencyId);

            var initialTransactions = new[]
            {
                new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = depositContract.ProgramStartDate,
                    SenderAccountNumber = BankConstants.CashDeskAccountNumber,
                    ReceiverAccountNumber = regularAccount.AccountNumber
                },
                new Transaction
                {
                    ContractNumber = depositContract.ContractNumber,
                    CurrencyId = depositContract.CurrencyId,
                    Amount = depositContract.Amount,
                    CreatedAt = depositContract.ProgramStartDate,
                    SenderAccountNumber = regularAccount.AccountNumber,
                    ReceiverAccountNumber = bankDevelopmentFundAccount.AccountNumber
                }
            };

            _context.Transactions.AddRange(initialTransactions);

            await _context.SaveChangesAsync();

            return new OpenDepositResponseModel
            {
                RegularAccountPin = regularAccountPin,
                DepositAccountPin = depositAccountPin
            };
        }

        public async Task RevokeDepositAsync(Guid contractNumber)
        {
            var depositContract = await _context.DepositContracts.FindAsync(contractNumber);

            if (depositContract == null)
            {
                throw new ValidationException($"Contract with number {contractNumber} does not exist.");
            }
            if (depositContract.DepositTypeId != (int) MainDepositType.Revocable)
            {
                throw new ValidationException("Deposit is not revocable.");
            }
            if (depositContract.IsCompleted)
            {
                throw new ValidationException("Deposit contract has already been completed.");
            }
            if (depositContract.IsRevoked)
            {
                throw new ValidationException("Deposit contract has already been revoked.");
            }

            var bankDevelopmentFund = await _context.Accounts
                .Where(x => x.Type == AccountType.BankDevelopmentFund && x.CurrencyId == depositContract.CurrencyId)
                .SingleAsync();
            
            var returnTransaction = _context.Transactions.Add(new Transaction
            {
                ContractNumber = depositContract.ContractNumber,
                CurrencyId = depositContract.CurrencyId,
                Amount = depositContract.Amount,
                CreatedAt = _currentDateTimeProvider.Now(),
                SenderAccount = bankDevelopmentFund,
                SenderAccountNumber = bankDevelopmentFund.AccountNumber,
                ReceiverAccount = depositContract.RegularAccount,
                ReceiverAccountNumber = depositContract.RegularAccountNumber
            });

            depositContract.IsRevoked = true;

            await _context.SaveChangesAsync();
        }
    }
}