using System.Threading.Tasks;
using BankInformationSystem.Business.Models;

namespace BankInformationSystem.Business.Services
{
    public interface IPaymentService
    {
        Task<MobileCarrierPaymentChequeModel> MakeMobileCarrierPaymentAsync(MobileCarrierPaymentRequestModel model);
    }
}