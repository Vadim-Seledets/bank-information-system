using System.Collections.Generic;

namespace BankInformationSystem.Business.Models
{
    public class BankOperationAuxiliaryInfo
    {
        public IList<CityModel> Cities { get; set; }

        public IList<CitizenshipModel> CountriesOfCitizenship { get; set; }

        public IList<DisabilityModel> Disabilities { get; set; }

        public IList<CurrencyModel> Currencies { get; set; }

        public IList<MaritalStatusModel> MaritalStatuses { get; set; }

        public IList<DepositTypeModel> DepositTypes { get; set; }
    }
}