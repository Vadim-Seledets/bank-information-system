using AutoMapper;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Data.Entities;

namespace BankInformationSystem.Business.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CustomerCreateModel, Customer>()
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.Disability, m => m.Ignore())
                .ForMember(x => x.MaritalStatus, m => m.Ignore())
                .ForMember(x => x.Accounts, m => m.Ignore());
            
            CreateMap<CustomerUpdateModel, Customer>()
                .ForMember(x => x.Disability, m => m.Ignore())
                .ForMember(x => x.MaritalStatus, m => m.Ignore())
                .ForMember(x => x.Accounts, m => m.Ignore());
            
            CreateMap<Customer, CustomerFullInfoModel>();
            
            CreateMap<Customer, CustomerShortInfoModel>()
                .ForMember(x => x.Email, m => m.MapFrom(x => x.Contacts.Email));

            CreateMap<AddressModel, PlaceOfLiving>()
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.City, m => m.Ignore())
                .ForMember(x => x.Customer, m => m.Ignore())
                .ForMember(x => x.CustomerId, m => m.Ignore());

            CreateMap<PlaceOfLiving, AddressModel>();

            CreateMap<AddressModel, PlaceOfRegistration>()
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.City, m => m.Ignore())
                .ForMember(x => x.Customer, m => m.Ignore())
                .ForMember(x => x.CustomerId, m => m.Ignore());

            CreateMap<PlaceOfRegistration, AddressModel>();

            CreateMap<BirthInfoModel, BirthInfo>()
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.Customer, m => m.Ignore())
                .ForMember(x => x.CustomerId, m => m.Ignore());

            CreateMap<BirthInfo, BirthInfoModel>();

            CreateMap<CitizenshipModel, Citizenship>().ReverseMap();

            CreateMap<CityModel, City>().ReverseMap();

            CreateMap<ContactsModel, Contacts>()
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.Customer, m => m.Ignore())
                .ForMember(x => x.CustomerId, m => m.Ignore());

            CreateMap<Contacts, ContactsModel>();

            CreateMap<CurrencyModel, Currency>().ReverseMap();

            CreateMap<DisabilityModel, Disability>().ReverseMap();

            CreateMap<MaritalStatusModel, MaritalStatus>().ReverseMap();

            CreateMap<PassportModel, Passport>()
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.Citizenship, m => m.Ignore())
                .ForMember(x => x.Customer, m => m.Ignore())
                .ForMember(x => x.CustomerId, m => m.Ignore());

            CreateMap<Passport, PassportModel>();

            CreateMap<IncomePerMonthModel, IncomePerMonth>()
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.Currency, m => m.Ignore())
                .ForMember(x => x.Customer, m => m.Ignore())
                .ForMember(x => x.CustomerId, m => m.Ignore());

            CreateMap<IncomePerMonth, IncomePerMonthModel>();
            
            CreateMap<WorkInfoModel, WorkInfo>()
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.Customer, m => m.Ignore())
                .ForMember(x => x.CustomerId, m => m.Ignore());

            CreateMap<WorkInfo, WorkInfoModel>();

            CreateMap<DepositContract, ProgramContractShortInfoModel>();

            CreateMap<DepositContract, DepositContractDetailsModel>()
                .ForMember(x => x.Transactions, m => m.Ignore());

            CreateMap<Transaction, TransactionReportModel>();

            CreateMap<DepositCreateModel, CreateAccountTemplateModel>()
                .ForMember(x => x.AccountType, m => m.Ignore())
                .ForMember(x => x.AccountActivity, m => m.Ignore());

            CreateMap<DepositCreateModel, DepositContract>()
                .ForMember(x => x.ValidUntil, m => m.MapFrom(x => x.ContractValidUntil))
                .ForMember(x => x.ProgramStartDate, m => m.MapFrom(x => x.ProgramStartDate.Date))
                .ForMember(x => x.ProgramEndDate, m => m.MapFrom(x => x.ProgramEndDate.Date))
                .ForMember(x => x.IsRevoked, m => m.Ignore())
                .ForMember(x => x.IsCompleted, m => m.Ignore())
                .ForMember(x => x.CompletedAt, m => m.Ignore())
                .ForMember(x => x.Currency, m => m.Ignore())
                .ForMember(x => x.DepositType, m => m.Ignore())
                .ForMember(x => x.LatestInterestTransactionId, m => m.Ignore())
                .ForMember(x => x.LatestInterestTransaction, m => m.Ignore())
                .ForMember(x => x.RegularAccount, m => m.Ignore())
                .ForMember(x => x.RegularAccountNumber, m => m.Ignore())
                .ForMember(x => x.DepositAccount, m => m.Ignore())
                .ForMember(x => x.DepositAccountNumber, m => m.Ignore())
                .ForMember(x => x.Customer, m => m.Ignore());
            
            CreateMap<DepositType, DepositTypeModel>();
        }
    }
}