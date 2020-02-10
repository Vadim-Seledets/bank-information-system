using System;
using System.Threading.Tasks;
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
        private readonly IVirtualDateTimeManager _virtualDateTimeManager;

        public EnvironmentController(
            ICurrentDateTimeProvider currentDateTimeProvider,
            IVirtualDateTimeManager virtualDateTimeManager)
        {
            _currentDateTimeProvider = currentDateTimeProvider;
            _virtualDateTimeManager = virtualDateTimeManager;
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
        
        [HttpGet]
        [Route("utc-offset")]
        [ProducesResponseType(typeof(DateTime), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DateTime>> UtcOffsetAsync()
        {
            var now = await _virtualDateTimeManager.GetUtcOffsetAsync();

            return Ok(now);
        }
    }
}