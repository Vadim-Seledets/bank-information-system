﻿// <auto-generated />
using System;
using BankInformationSystem.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BankInformationSystem.Data.Migrations
{
    [DbContext(typeof(BankInformationSystemDbContext))]
    partial class BankInformationSystemDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1");

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Account", b =>
                {
                    b.Property<string>("AccountNumber")
                        .HasColumnType("TEXT");

                    b.Property<int>("Activity")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Credit")
                        .HasColumnType("TEXT");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Debit")
                        .HasColumnType("TEXT");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("AccountNumber");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("CustomerId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.BirthInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("PlaceOfBirth")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.ToTable("BirthInfos");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Citizenship", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("CountriesOfCitizenship");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Country = "Belarus"
                        },
                        new
                        {
                            Id = 2,
                            Country = "Russia"
                        },
                        new
                        {
                            Id = 3,
                            Country = "Ukraine"
                        });
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Cities");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Minsk"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Vitebsk"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Mogilev"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Gomel"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Brest"
                        },
                        new
                        {
                            Id = 6,
                            Name = "Grodno"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Moscow"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Saint Petersburg"
                        },
                        new
                        {
                            Id = 9,
                            Name = "Kiev"
                        },
                        new
                        {
                            Id = 10,
                            Name = "Kharkiv"
                        },
                        new
                        {
                            Id = 11,
                            Name = "Dnipropetrovsk"
                        },
                        new
                        {
                            Id = 12,
                            Name = "Odessa"
                        },
                        new
                        {
                            Id = 13,
                            Name = "Vinnytsia"
                        });
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Contacts", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("HomePhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("MobilePhoneNumber")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Currency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Code")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Currencies");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Code = "BYN"
                        },
                        new
                        {
                            Id = 2,
                            Code = "RUB"
                        },
                        new
                        {
                            Id = 3,
                            Code = "UAH"
                        },
                        new
                        {
                            Id = 4,
                            Code = "EUR"
                        },
                        new
                        {
                            Id = 5,
                            Code = "USD"
                        });
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DisabilityId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<int>("Gender")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsLiableForMilitaryService")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsRetired")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<int>("MaritalStatusId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("MiddleName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("DisabilityId");

                    b.HasIndex("MaritalStatusId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.DepositContract", b =>
                {
                    b.Property<Guid>("ContractNumber")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Amount")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("CompletedAt")
                        .HasColumnType("TEXT");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("DepositAccountNumber")
                        .HasColumnType("TEXT");

                    b.Property<int>("DepositTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsRevoked")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("LatestInterestTransactionId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("ProgramEndDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("ProgramStartDate")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Rate")
                        .HasColumnType("TEXT");

                    b.Property<string>("RegularAccountNumber")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("ValidUntil")
                        .HasColumnType("TEXT");

                    b.HasKey("ContractNumber");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("DepositAccountNumber");

                    b.HasIndex("DepositTypeId");

                    b.HasIndex("LatestInterestTransactionId");

                    b.HasIndex("RegularAccountNumber");

                    b.ToTable("DepositContracts");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.DepositType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("DepositTypes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Revocable"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Irrevocable"
                        });
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Disability", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Disabilities");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Physical"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Visual"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Hearing"
                        },
                        new
                        {
                            Id = 4,
                            Description = "Mental"
                        },
                        new
                        {
                            Id = 5,
                            Description = "Intellectual"
                        },
                        new
                        {
                            Id = 6,
                            Description = "Learning"
                        },
                        new
                        {
                            Id = 7,
                            Description = "None"
                        });
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.IncomePerMonth", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Amount")
                        .HasColumnType("TEXT");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.ToTable("IncomesPerMonth");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.LoanContract", b =>
                {
                    b.Property<Guid>("ContractNumber")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Amount")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("CompletedAt")
                        .HasColumnType("TEXT");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("LatestPaymentTransactionId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("LoadTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LoanPaymentAccountNumber")
                        .HasColumnType("TEXT");

                    b.Property<int?>("LoanTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("ProgramEndDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("ProgramStartDate")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Rate")
                        .HasColumnType("TEXT");

                    b.Property<string>("RegularAccountNumber")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("ValidUntil")
                        .HasColumnType("TEXT");

                    b.HasKey("ContractNumber");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("LatestPaymentTransactionId");

                    b.HasIndex("LoanPaymentAccountNumber");

                    b.HasIndex("LoanTypeId");

                    b.HasIndex("RegularAccountNumber");

                    b.ToTable("LoanContracts");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.LoanType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("LoanType");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Annuity"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Differential"
                        });
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.MaritalStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("MaritalStatuses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Married"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Widowed"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Divorced"
                        },
                        new
                        {
                            Id = 4,
                            Description = "Single"
                        });
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Passport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CitizenshipId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("IdNumber")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("IssuedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("IssuingAuthority")
                        .HasColumnType("TEXT");

                    b.Property<string>("PassportNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("Series")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CitizenshipId");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.ToTable("Passports");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.PlaceOfLiving", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .HasColumnType("TEXT");

                    b.Property<int>("CityId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.ToTable("PlacesOfLiving");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.PlaceOfRegistration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .HasColumnType("TEXT");

                    b.Property<int>("CityId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.ToTable("PlaceOfRegistrations");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Setting", b =>
                {
                    b.Property<string>("Key")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("Key");

                    b.ToTable("Settings");

                    b.HasData(
                        new
                        {
                            Key = "DateDaysOffset",
                            Value = "0"
                        });
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Amount")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("ContractNumber")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsCommitted")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ReceiverAccountNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("SenderAccountNumber")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("ReceiverAccountNumber");

                    b.HasIndex("SenderAccountNumber");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.WorkInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Company")
                        .HasColumnType("TEXT");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Position")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.ToTable("WorkInfos");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Account", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithMany("Accounts")
                        .HasForeignKey("CustomerId");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.BirthInfo", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithOne("BirthInfo")
                        .HasForeignKey("BankInformationSystem.Data.Entities.BirthInfo", "CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Contacts", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithOne("Contacts")
                        .HasForeignKey("BankInformationSystem.Data.Entities.Contacts", "CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Customer", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Disability", "Disability")
                        .WithMany()
                        .HasForeignKey("DisabilityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.MaritalStatus", "MaritalStatus")
                        .WithMany()
                        .HasForeignKey("MaritalStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.DepositContract", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Account", "DepositAccount")
                        .WithMany()
                        .HasForeignKey("DepositAccountNumber");

                    b.HasOne("BankInformationSystem.Data.Entities.DepositType", "DepositType")
                        .WithMany()
                        .HasForeignKey("DepositTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Transaction", "LatestInterestTransaction")
                        .WithMany()
                        .HasForeignKey("LatestInterestTransactionId");

                    b.HasOne("BankInformationSystem.Data.Entities.Account", "RegularAccount")
                        .WithMany()
                        .HasForeignKey("RegularAccountNumber");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.IncomePerMonth", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithOne("IncomePerMonth")
                        .HasForeignKey("BankInformationSystem.Data.Entities.IncomePerMonth", "CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.LoanContract", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Transaction", "LatestPaymentTransaction")
                        .WithMany()
                        .HasForeignKey("LatestPaymentTransactionId");

                    b.HasOne("BankInformationSystem.Data.Entities.Account", "LoanPaymentAccount")
                        .WithMany()
                        .HasForeignKey("LoanPaymentAccountNumber");

                    b.HasOne("BankInformationSystem.Data.Entities.LoanType", "LoanType")
                        .WithMany()
                        .HasForeignKey("LoanTypeId");

                    b.HasOne("BankInformationSystem.Data.Entities.Account", "RegularAccount")
                        .WithMany()
                        .HasForeignKey("RegularAccountNumber");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Passport", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Citizenship", "Citizenship")
                        .WithMany()
                        .HasForeignKey("CitizenshipId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithOne("Passport")
                        .HasForeignKey("BankInformationSystem.Data.Entities.Passport", "CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.PlaceOfLiving", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithOne("PlaceOfLiving")
                        .HasForeignKey("BankInformationSystem.Data.Entities.PlaceOfLiving", "CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.PlaceOfRegistration", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithOne("PlaceOfRegistration")
                        .HasForeignKey("BankInformationSystem.Data.Entities.PlaceOfRegistration", "CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.Transaction", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BankInformationSystem.Data.Entities.Account", "ReceiverAccount")
                        .WithMany()
                        .HasForeignKey("ReceiverAccountNumber");

                    b.HasOne("BankInformationSystem.Data.Entities.Account", "SenderAccount")
                        .WithMany()
                        .HasForeignKey("SenderAccountNumber");
                });

            modelBuilder.Entity("BankInformationSystem.Data.Entities.WorkInfo", b =>
                {
                    b.HasOne("BankInformationSystem.Data.Entities.Customer", "Customer")
                        .WithOne("WorkInfo")
                        .HasForeignKey("BankInformationSystem.Data.Entities.WorkInfo", "CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
