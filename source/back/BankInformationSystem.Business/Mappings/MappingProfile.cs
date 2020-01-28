using AutoMapper;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Data.Entities;

namespace BankInformationSystem.Business.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CustomerCreateUpdateModel, Customer>();
            
            CreateMap<Customer, CustomerFullInfoModel>();
            
            CreateMap<Customer, CustomerShortInfoModel>();

            CreateMap<AddressModel, PlaceOfLiving>().ReverseMap();

            CreateMap<AddressModel, PlaceOfRegistration>().ReverseMap();

            CreateMap<BirthInfoModel, BirthInfo>().ReverseMap();

            CreateMap<CitizenshipModel, Citizenship>().ReverseMap();

            CreateMap<CityModel, City>().ReverseMap();

            CreateMap<ContactsModel, Contacts>().ReverseMap();

            CreateMap<CurrencyModel, Currency>().ReverseMap();

            CreateMap<DisabilityModel, Disability>().ReverseMap();

            CreateMap<MaritalStatusModel, MaritalStatus>().ReverseMap();

            CreateMap<PassportModel, Passport>().ReverseMap();
        }
    }
}