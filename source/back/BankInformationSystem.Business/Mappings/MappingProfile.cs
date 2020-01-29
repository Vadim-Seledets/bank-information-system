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
                .ForMember(d => d.Id, m => m.Ignore())
                .ForMember(d => d.Disability, m => m.Ignore())
                .ForMember(d => d.MaritalStatus, m => m.Ignore());
            
            CreateMap<CustomerUpdateModel, Customer>()
                .ForMember(d => d.Disability, m => m.Ignore())
                .ForMember(d => d.MaritalStatus, m => m.Ignore());
            
            CreateMap<Customer, CustomerFullInfoModel>();
            
            CreateMap<Customer, CustomerShortInfoModel>();

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
        }
    }
}