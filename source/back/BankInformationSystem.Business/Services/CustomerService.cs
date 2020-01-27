using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BankInformationSystem.Business.Models;
using BankInformationSystem.DataAccess;
using BankInformationSystem.DataAccess.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly BankInformationSystemDbContext _context;
        private readonly IValidator<Customer> _customerValidator;
        private readonly IMapper _mapper;

        public CustomerService(
            BankInformationSystemDbContext context,
            IValidator<Customer> customerValidator,
            IMapper mapper)
        {
            _context = context;
            _customerValidator = customerValidator;
            _mapper = mapper;
        }
        
        public async Task<IList<CustomerShortInfoModel>> GetCustomersAsync()
        {
            var query = _context.Customers.AsNoTracking();
            var customers = await _mapper
                .ProjectTo<CustomerShortInfoModel>(query)
                .ToListAsync();

            return customers;
        }
        
        public async Task<CustomerFullInfoModel> GetCustomerByIdAsync(int id)
        {
            var query = _context.Customers.AsNoTracking().Where(x => x.Id == id);
            var customer = await _mapper
                .ProjectTo<CustomerFullInfoModel>(query)
                .FirstOrDefaultAsync();

            return customer;
        }

        public async Task<int> CreateCustomerAsync(CustomerCreateUpdateModel model)
        {
            var newCustomer = _mapper.Map<Customer>(model);
            await _customerValidator.ValidateAndThrowAsync(newCustomer);

            _context.Add(newCustomer);
            await _context.SaveChangesAsync();

            return newCustomer.Id;
        }

        public async Task UpdateCustomerAsync(int id, CustomerCreateUpdateModel model)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                throw new ValidationException($"User with id {id} does not exist.");
            }

            _mapper.Map(model, customer);
            await _customerValidator.ValidateAndThrowAsync(customer);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteCustomerAsync(int id)
        {
            var customerToDelete = await _context.Customers.FindAsync(id);
            if (customerToDelete == null)
            {
                throw new ValidationException($"User with id {id} does not exist.");
            }

            _context.Remove(customerToDelete);
            await _context.SaveChangesAsync();
        }
    }
}