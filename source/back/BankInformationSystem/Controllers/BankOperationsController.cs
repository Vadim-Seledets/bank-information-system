using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Services;
using BankInformationSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankInformationSystem.Controllers
{
    [ApiController]
    [Route("operations")]
    public class BankOperationsController : ControllerBase
    {
        private readonly IBankOperationsService _operationsService;

        public BankOperationsController(IBankOperationsService operationsService)
        {
            _operationsService = operationsService;
        }

        [HttpGet]
        [Route("deposits")]
        [ProducesResponseType(typeof(IEnumerable<DepositContractShortInfoModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<DepositContractShortInfoModel>>> GetDepositsAsync()
        {
            var customers = await _operationsService.GetDepositContractsAsync();

            return Ok(customers);
        }
        
        [HttpGet]
        [Route("deposits/{number}")]
        [ProducesResponseType(typeof(DepositContractDetailsModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DepositContractDetailsModel>> GetDepositContractByNumberAsync(Guid number)
        {
            var contract = await _operationsService.GetDepositContractDetailsAsync(number);

            if (contract == null)
            {
                return NotFound();
            }
            
            return Ok(contract);
        }

        [HttpPost]
        [Route("deposits")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Guid>> OpenDepositAsync(DepositCreateModel model)
        {
            await _operationsService.OpenDepositAsync(model);
            
            return NoContent();
        }
        
        [HttpPost]
        [Route("deposits/{number}/revoke")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Guid>> RevokeDepositAsync(Guid number)
        {
            await _operationsService.RevokeDepositAsync(number);
            
            return NoContent();
        }
        
        [HttpPost]
        [Route("commit")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Guid>> CloseBankDayAsync(CloseBankDayModel model)
        {
            await _operationsService.CloseBankDayAsync(model.Times);
            
            return NoContent();
        }
        
        [HttpGet]
        [Route("auxiliary")]
        [ProducesResponseType(typeof(BankOperationAuxiliaryInfo), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<BankOperationAuxiliaryInfo>> GetCustomerAuxiliaryInfo()
        {
            var result = await _operationsService.GetBankOperationsAuxiliaryInfoAsync();

            return Ok(result);
        }
    }
}