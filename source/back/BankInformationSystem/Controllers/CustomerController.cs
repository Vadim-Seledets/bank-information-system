using System.Collections.Generic;
using System.Threading.Tasks;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Services;
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
        public async Task<ActionResult<IEnumerable<CustomerShortInfoModel>>> GetCustomersAsync()
        {
            var customers = await _customerService.GetCustomersAsync();

            return Ok(customers);
        }
        
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<IEnumerable<CustomerFullInfoModel>>> GetCustomerAsync(int id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);

            if (customer == null)
            {
                return NotFound();
            }
            
            return Ok(customer);
        }

        [HttpGet]
        [Route("auxiliary")]
        public async Task<ActionResult<CustomerAuxiliaryInfo>> GetCustomerAuxiliaryInfo()
        {
            var result = await _customerService.GetCustomerAuxiliaryInfoAsync();

            return Ok(result);
        }
        
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<int>> CreateCustomerAsync(CustomerCreateUpdateModel model)
        {
            var customerId = await _customerService.CreateCustomerAsync(model);
            
            return Ok(customerId);
        }
        
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateCustomerAsync(int id, CustomerCreateUpdateModel model)
        {
            await _customerService.UpdateCustomerAsync(id, model);
            
            return NoContent();
        }
        
        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteCustomerAsync(int id)
        {
            await _customerService.DeleteCustomerAsync(id);

            return NoContent();
        }
    }
}