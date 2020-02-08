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
    [Route("customers")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        [Route("")]
        [ProducesResponseType(typeof(IEnumerable<CustomerShortInfoModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<CustomerShortInfoModel>>> GetCustomersAsync()
        {
            var customers = await _customerService.GetCustomersAsync();

            return Ok(customers);
        }
        
        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(typeof(CustomerFullInfoModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CustomerFullInfoModel>> GetCustomerByIdAsync(int id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);

            if (customer == null)
            {
                return NotFound();
            }
            
            return Ok(customer);
        }

        [HttpPost]
        [Route("")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> CreateCustomerAsync(CustomerCreateModel model)
        {
            var customerId = await _customerService.CreateCustomerAsync(model);
            
            return Ok(customerId);
        }
        
        [HttpPut]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateCustomerAsync(int id, CustomerUpdateModel model)
        {
            model.Id = id;
            await _customerService.UpdateCustomerAsync(model);
            
            return NoContent();
        }
        
        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> DeleteCustomerAsync(int id)
        {
            await _customerService.DeleteCustomerAsync(id);

            return NoContent();
        }
    }
}