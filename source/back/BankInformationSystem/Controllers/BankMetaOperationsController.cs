using System;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Services;
using BankInformationSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankInformationSystem.Controllers
{
    [ApiController]
    [Route("meta-operations")]
    public class BankMetaOperationsController : ControllerBase
    {
        private readonly IBankMetaOperationsService _metaOperationsService;

        public BankMetaOperationsController(IBankMetaOperationsService metaOperationsService)
        {
            _metaOperationsService = metaOperationsService;
        }

        [HttpPost]
        [Route("commit")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Guid>> CloseBankDayAsync(CloseBankDayModel model)
        {
            await _metaOperationsService.CloseBankDayAsync(model.Times);
            
            return NoContent();
        }
        
        [HttpGet]
        [Route("auxiliary")]
        [ProducesResponseType(typeof(BankOperationAuxiliaryInfo), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<BankOperationAuxiliaryInfo>> GetCustomerAuxiliaryInfo()
        {
            var result = await _metaOperationsService.GetBankOperationsAuxiliaryInfoAsync();

            return Ok(result);
        }
    }
}