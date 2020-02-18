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
        
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        [Route("mobile-carrier")]
        [ProducesResponseType(typeof(MobileCarrierPaymentChequeModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> MakeMobileCarrierPaymentAsync(MobileCarrierPaymentRequestModel model)
        {
            var cheque = await _paymentService.MakeMobileCarrierPaymentAsync(model);

            return Ok(cheque);
        }
    }
}