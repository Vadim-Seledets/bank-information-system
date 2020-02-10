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
            var customerInfoQuery = from customer in _context.Customers
                                    join depositContract in _context.DepositContracts.Where(x => !(x.IsCompleted || x.IsRevoked))
                                        on customer.Id equals depositContract.CustomerId into customerDeposits
                                    from deposit in customerDeposits.DefaultIfEmpty()
                                    join loanContract in _context.LoanContracts.Where(x => !x.IsCompleted)
                                        on customer.Id equals loanContract.CustomerId into customerLoans
                                    from loanContract in customerLoans.DefaultIfEmpty()
                                    where customer.Id == id
                                    select new { Customer = customer, HasLoan = loanContract != null, HasDeposit = deposit != null };

            var customerInfoDictionary = (await customerInfoQuery.ToListAsync())
                .GroupBy(x => x.Customer.Id)
                .ToDictionary(x => x.Key, x => new
                {
                    x.FirstOrDefault()?.Customer,
                    HasLoan = x.Any(y => y.HasLoan),
                    HasDeposit = x.Any(y => y.HasDeposit)
                });

            if (!customerInfoDictionary.TryGetValue(id, out var contractsInfo))
            {
                throw new ValidationException($"Customer with id {id} does not exist.");
            }
            if (contractsInfo.HasDeposit)
            {
                throw new ValidationException($"Customer with id {id} has active deposits and can't be deleted.");
            }
            if (contractsInfo.HasLoan)
            {
                throw new ValidationException($"Customer with id {id} has active loans and can't be deleted.");
            }

            _context.Remove(contractsInfo.Customer);
            await _context.SaveChangesAsync();
        }
    }
}