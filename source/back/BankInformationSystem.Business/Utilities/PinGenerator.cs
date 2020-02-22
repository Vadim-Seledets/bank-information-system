using System;
using System.Security.Cryptography;
using System.Text;

namespace BankInformationSystem.Business.Utilities
{
    public class PinGenerator : IPinGenerator
    {
        public (string Pin, string PinHash) CreatePin()
        {
            var random = new Random();
            using var algorithm = SHA256.Create();
            
            var pin = random.Next(0, 9999).ToString().PadLeft(4, '0');
            var pinHashBytes = algorithm.ComputeHash(Encoding.UTF8.GetBytes(pin));
            var pinHash = Convert.ToBase64String(pinHashBytes);

            return (pin, pinHash);
        }
    }
}