using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BankInformationSystem.Business.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly BankInformationSystemDbContext _context;
        private readonly IValidator<CustomerFullInfoBaseModel> _customerFullInfoBaseModelValidator;
        private readonly IMapper _mapper;

        public CustomerService(
            BankInformationSystemDbContext context,
            IValidator<CustomerFullInfoBaseModel> customerFullInfoBaseModelValidator,
            IMapper mapper)
        {
            _context = context;
            _customerFullInfoBaseModelValidator = customerFullInfoBaseModelValidator;
            _mapper = mapper;
        }
        
        public async Task<IList<CustomerShortInfoModel>> GetCustomersAsync()
        {
            var query = _context.Customers.AsNoTracking()
                .OrderByDescending(x => x.LastName)
                .ThenByDescending(x => x.FirstName)
                .ThenByDescending(x => x.MiddleName);
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

        public async Task<CustomerAuxiliaryInfo> GetCustomerAuxiliaryInfoAsync()
        {
            return new CustomerAuxiliaryInfo
            {
                Cities = await _mapper
                    .ProjectTo<CityModel>(_context.Cities)
                    .ToListAsync(),
                CountriesOfCitizenship = await _mapper
                    .ProjectTo<CitizenshipModel>(_context.CountriesOfCitizenship)
                    .ToListAsync(),
                Disabilities = await _mapper
                    .ProjectTo<DisabilityModel>(_context.Disabilities)
                    .ToListAsync(),
                Currencies = await _mapper
                    .ProjectTo<CurrencyModel>(_context.Currencies)
                    .ToListAsync(),
                MaritalStatuses = await _mapper
                    .ProjectTo<MaritalStatusModel>(_context.MaritalStatuses)
                    .ToListAsync()
            };
        }

        public async Task<int> CreateCustomerAsync(CustomerCreateModel model)
        {
            await _customerFullInfoBaseModelValidator.ValidateAndThrowAsync(model);
            
            var newCustomer = _mapper.Map<Customer>(model);
            _context.Add(newCustomer);
            await _context.SaveChangesAsync();

            return newCustomer.Id;
        }

        public async Task UpdateCustomerAsync(CustomerUpdateModel model)
        {
            var customer = await _context.Customers
                .Include(x => x.Passport)
                .Include(x => x.BirthInfo)
                .Include(x => x.PlaceOfLiving)
                .Include(x => x.PlaceOfRegistration)
                .Include(x => x.IncomePerMonth)
                .Include(x => x.WorkInfo)
                .Include(x => x.Contacts)
                .SingleOrDefaultAsync(x => x.Id == model.Id);
            if (customer == null)
            {
                throw new ValidationException($"User with id {model.Id} does not exist.");
            }

            await _customerFullInfoBaseModelValidator.ValidateAndThrowAsync(model);
            
            _mapper.Map(model, customer);
            customer.Contacts.CustomerId = customer.Id;
            customer.Passport.CustomerId = customer.Id;
            customer.BirthInfo.CustomerId = customer.Id;
            customer.PlaceOfLiving.CustomerId = customer.Id;
            customer.IncomePerMonth.CustomerId = customer.Id;
            customer.WorkInfo.CustomerId = customer.Id;

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