namespace BankInformationSystem.Business.Utilities
{
    public interface IPinGenerator
    {
        (string Pin, string PinHash) CreatePin();
    }
}