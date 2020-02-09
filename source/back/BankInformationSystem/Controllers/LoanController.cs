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
    [Route("loans")]
    public class LoanController : ControllerBase
    {
        private readonly ILoanService _loanService;

        public LoanController(ILoanService loanService)
        {
            _loanService = loanService;
        }
        
        [HttpGet]
        [Route("")]
        [ProducesResponseType(typeof(IEnumerable<ProgramContractShortInfoModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ProgramContractShortInfoModel>>> GetLoansAsync()
        {
            var customers = await _loanService.GetLoanContractsAsync();

            return Ok(customers);
        }
        
        [HttpGet]
        [Route("{number}")]
        [ProducesResponseType(typeof(LoanContractDetailsModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<LoanContractDetailsModel>> GetLoanContractByNumberAsync(Guid number)
        {
            var contract = await _loanService.GetLoanContractDetailsAsync(number);

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
        public async Task<ActionResult<Guid>> CreateLoanAsync(LoanCreateModel model)
        {
            await _loanService.CreateLoanAsync(model);
            
            return NoContent();
        }
    }
}