using System;
using System.ComponentModel.DataAnnotations.Schema;
using BankInformationSystem.Common;
using BankInformationSystem.Common.Models;

namespace BankInformationSystem.Data.Entities
{
    public class Transaction
    {
        public int Id { get; set; }

        public Guid? ContractNumber { get; set; }

        public int CurrencyId { get; set; }

        public virtual Currency Currency { get; set; }

        public decimal Amount { get; set; }

        // TODO: Rename to "ActiveSince" or similar
        public DateTime CreatedAt { get; set; }

        public bool IsCommitted { get; set; }
        
        [ForeignKey(nameof(SenderAccount))]
        public string SenderAccountNumber { get; set; }

        public virtual Account SenderAccount { get; set; }
        
        [ForeignKey(nameof(ReceiverAccount))]
        public string ReceiverAccountNumber { get; set; }

        public virtual Account ReceiverAccount { get; set; }
        
        public void Commit()
        {
            if (IsCommitted)
            {
                return;
            }
            
            if (SenderAccountNumber != BankConstants.CashDeskAccountNumber)
            {
                if (SenderAccount.Activity == AccountActivity.Passive)
                {
                    SenderAccount.Debit += Amount;
                }
                else
                {
                    SenderAccount.Credit += Amount;
                }   
            }

            if (ReceiverAccountNumber != BankConstants.CashDeskAccountNumber)
            {
                if (ReceiverAccount.Activity == AccountActivity.Passive)
                {
                    ReceiverAccount.Credit += Amount;
                }
                else
                {
                    ReceiverAccount.Debit += Amount;
                }
            }

            IsCommitted = true;
        }
    }
}