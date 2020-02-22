using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Services;
using BankInformationSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankInformationSystem.Controllers
{
    [ApiController]
    [Route("accounts")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IAuthorizationService _authorizationService;

        public AccountController(
            IAccountService accountService,
            IAuthorizationService authorizationService)
        {
            _accountService = accountService;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        [Route("bank-funds/initialize")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> InitializeBankDevelopmentFundsAsync()
        {
            await _accountService.InitializeBankDevelopmentFundsAsync();

            return NoContent();
        }
        
        [HttpGet]
        [Route("{accountNumber}/balance")]
        [ProducesResponseType(typeof(AccountBalanceModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetAccountBalanceAsync(string accountNumber)
        {
            var pinHash = HttpContext.Request.Headers["Authorization"];
            await _authorizationService.AuthorizeForAtmActionsAsync(accountNumber, pinHash);
            
            var balanceModel = await _accountService.GetAccountBalanceAsync(accountNumber);

            return Ok(balanceModel);
        }
        
        [HttpPost]
        [Route("{accountNumber}/withdraw")]
        [ProducesResponseType(typeof(CashWithdrawalChequeModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> WithdrawCashAsync(string accountNumber, CashWithdrawalModel model)
        {
            var pinHash = HttpContext.Request.Headers["Authorization"];
            await _authorizationService.AuthorizeForAtmActionsAsync(accountNumber, pinHash);
            
            var cheque = await _accountService.WithdrawCashAsync(accountNumber, model.Amount);

            return Ok(cheque);
        }
    }
}