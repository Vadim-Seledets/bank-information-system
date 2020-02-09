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
    [Route("deposits")]
    public class DepositController : ControllerBase
    {
        private readonly IDepositService _depositService;

        public DepositController(IDepositService depositService)
        {
            _depositService = depositService;
        }
        
        [HttpGet]
        [Route("")]
        [ProducesResponseType(typeof(IEnumerable<ProgramContractShortInfoModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ProgramContractShortInfoModel>>> GetDepositsAsync()
        {
            var customers = await _depositService.GetDepositContractsAsync();

            return Ok(customers);
        }
        
        [HttpGet]
        [Route("{number}")]
        [ProducesResponseType(typeof(DepositContractDetailsModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DepositContractDetailsModel>> GetDepositContractByNumberAsync(Guid number)
        {
            var contract = await _depositService.GetDepositContractDetailsAsync(number);

            if (contract == null)
            {
                return NotFound();
            }
            
            return Ok(contract);
        }

        [HttpPost]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Guid>> OpenDepositAsync(DepositCreateModel model)
        {
            await _depositService.OpenDepositAsync(model);
            
            return NoContent();
        }
        
        [HttpPost]
        [Route("{number}/revoke")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Guid>> RevokeDepositAsync(Guid number)
        {
            await _depositService.RevokeDepositAsync(number);
            
            return NoContent();
        }
    }
}