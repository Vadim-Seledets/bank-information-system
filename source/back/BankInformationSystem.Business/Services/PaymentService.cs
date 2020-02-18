﻿using System.Threading.Tasks;
using AutoMapper;
using BankInformationSystem.Business.Models;

namespace BankInformationSystem.Business.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public PaymentService(
            IAccountService accountService,
            IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }
        
        public async Task<MobileCarrierPaymentChequeModel> MakeMobileCarrierPaymentAsync(MobileCarrierPaymentRequestModel model)
        {
            // For simplicity the sum will go to bank development fund
            var bankDevelopmentFund = await _accountService.GetBankDevelopmentFundAccountForCurrencyAsync(model.CurrencyId);

            var paymentTransaction = await _accountService.TransferMoneyAsync(
                model.AccountNumber,
                bankDevelopmentFund.AccountNumber,
                model.Amount);

            var cheque = _mapper.Map<MobileCarrierPaymentChequeModel>(paymentTransaction);
            cheque.CarrierId = model.CarrierId;
            cheque.PhoneNumber = model.PhoneNumber;
            
            // TODO: Create an audit entry for a payment

            return cheque;
        }
    }
}