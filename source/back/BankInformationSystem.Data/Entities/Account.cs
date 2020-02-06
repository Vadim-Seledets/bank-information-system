﻿using System.ComponentModel.DataAnnotations;
using BankInformationSystem.Common.Models;

namespace BankInformationSystem.Data.Entities
{
    public class Account
    {
        [Key]
        public string AccountNumber { get; set; }

        public AccountActivity Activity { get; set; }

        public AccountType Type { get; set; }

        public int CurrencyId { get; set; }

        public Currency Currency { get; set; }

        public decimal Debit { get; set; }

        public decimal Credit { get; set; }

        public int? CustomerId { get; set; }
        
        public Customer Customer { get; set; }

        public decimal NetBalance => Activity == AccountActivity.Active ? Debit - Credit : Credit - Debit;

        public bool DoesBelongToBank => CustomerId == null;
    }
}