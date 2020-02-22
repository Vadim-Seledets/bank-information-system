using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankInformationSystem.Controllers
{
    [ApiController]
    [Route("payments")]
    public class PaymentController : ControllerBase
    {
         private readonly IPaymentService _paymentService;
         private readonly IAuthorizationService _authorizationService;
        
        public PaymentController(
            IPaymentService paymentService,
            IAuthorizationService authorizationService)
        {
            _paymentService = paymentService;
            _authorizationService = authorizationService;
        }

        [HttpPost]
        [Route("mobile-carrier")]
        [ProducesResponseType(typeof(MobileCarrierPaymentChequeModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> MakeMobileCarrierPaymentAsync(MobileCarrierPaymentRequestModel model)
        {
            var pinHash = HttpContext.Request.Headers["Authorization"];
            await _authorizationService.AuthorizeForAtmActionsAsync(model.AccountNumber, pinHash);
            
            var cheque = await _paymentService.MakeMobileCarrierPaymentAsync(model);

            return Ok(cheque);
        }
    }
}