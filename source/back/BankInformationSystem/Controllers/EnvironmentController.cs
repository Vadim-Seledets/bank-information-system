using System;
using BankInformationSystem.Business.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankInformationSystem.Controllers
{
    [ApiController]
    [Route("environment")]
    public class EnvironmentController : ControllerBase
    {
        private readonly ICurrentDateTimeProvider _currentDateTimeProvider;

        public EnvironmentController(ICurrentDateTimeProvider currentDateTimeProvider)
        {
            _currentDateTimeProvider = currentDateTimeProvider;
        }
        
        [HttpGet]
        [Route("now")]
        [ProducesResponseType(typeof(DateTime), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<DateTime> Now()
        {
            var now = _currentDateTimeProvider.Now();

            return Ok(now);
        }
    }
}