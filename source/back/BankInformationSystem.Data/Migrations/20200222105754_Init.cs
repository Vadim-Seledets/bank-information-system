using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BankInformationSystem.Data.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CountriesOfCitizenship",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Country = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountriesOfCitizenship", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Currencies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DepositTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepositTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Disabilities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Disabilities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoanTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MaritalStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaritalStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MobileCarriers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MobileCarriers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Key = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Key);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(nullable: true),
                    MiddleName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Gender = table.Column<int>(nullable: false),
                    IsRetired = table.Column<bool>(nullable: false),
                    IsLiableForMilitaryService = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DisabilityId = table.Column<int>(nullable: false),
                    MaritalStatusId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customers_Disabilities_DisabilityId",
                        column: x => x.DisabilityId,
                        principalTable: "Disabilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Customers_MaritalStatuses_MaritalStatusId",
                        column: x => x.MaritalStatusId,
                        principalTable: "MaritalStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    AccountNumber = table.Column<string>(nullable: false),
                    Activity = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    CurrencyId = table.Column<int>(nullable: false),
                    PinHash = table.Column<string>(nullable: true),
                    Debit = table.Column<decimal>(nullable: false),
                    Credit = table.Column<decimal>(nullable: false),
                    CustomerId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.AccountNumber);
                    table.ForeignKey(
                        name: "FK_Accounts_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Accounts_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BirthInfos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PlaceOfBirth = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    CustomerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BirthInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BirthInfos_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(nullable: true),
                    HomePhoneNumber = table.Column<string>(nullable: true),
                    MobilePhoneNumber = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contacts_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IncomesPerMonth",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Amount = table.Column<decimal>(nullable: false),
                    CustomerId = table.Column<int>(nullable: false),
                    CurrencyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncomesPerMonth", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IncomesPerMonth_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IncomesPerMonth_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Passports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Series = table.Column<string>(nullable: true),
                    PassportNumber = table.Column<string>(nullable: true),
                    IssuingAuthority = table.Column<string>(nullable: true),
                    IssuedAt = table.Column<DateTime>(nullable: false),
                    IdNumber = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false),
                    CitizenshipId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Passports_CountriesOfCitizenship_CitizenshipId",
                        column: x => x.CitizenshipId,
                        principalTable: "CountriesOfCitizenship",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Passports_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlaceOfRegistrations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Address = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false),
                    CityId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceOfRegistrations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaceOfRegistrations_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlaceOfRegistrations_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlacesOfLiving",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Address = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false),
                    CityId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlacesOfLiving", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlacesOfLiving_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlacesOfLiving_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkInfos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Company = table.Column<string>(nullable: true),
                    Position = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkInfos_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ContractNumber = table.Column<Guid>(nullable: true),
                    CurrencyId = table.Column<int>(nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    IsCommitted = table.Column<bool>(nullable: false),
                    SenderAccountNumber = table.Column<string>(nullable: true),
                    ReceiverAccountNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_ReceiverAccountNumber",
                        column: x => x.ReceiverAccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_SenderAccountNumber",
                        column: x => x.SenderAccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DepositContracts",
                columns: table => new
                {
                    ContractNumber = table.Column<Guid>(nullable: false),
                    ProgramStartDate = table.Column<DateTime>(nullable: false),
                    ProgramEndDate = table.Column<DateTime>(nullable: false),
                    ValidUntil = table.Column<DateTime>(nullable: false),
                    IsCompleted = table.Column<bool>(nullable: false),
                    IsRevoked = table.Column<bool>(nullable: false),
                    CompletedAt = table.Column<DateTime>(nullable: true),
                    Rate = table.Column<decimal>(nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    CurrencyId = table.Column<int>(nullable: false),
                    DepositTypeId = table.Column<int>(nullable: false),
                    LatestInterestTransactionId = table.Column<int>(nullable: true),
                    RegularAccountNumber = table.Column<string>(nullable: true),
                    DepositAccountNumber = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepositContracts", x => x.ContractNumber);
                    table.ForeignKey(
                        name: "FK_DepositContracts_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepositContracts_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepositContracts_Accounts_DepositAccountNumber",
                        column: x => x.DepositAccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DepositContracts_DepositTypes_DepositTypeId",
                        column: x => x.DepositTypeId,
                        principalTable: "DepositTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepositContracts_Transactions_LatestInterestTransactionId",
                        column: x => x.LatestInterestTransactionId,
                        principalTable: "Transactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DepositContracts_Accounts_RegularAccountNumber",
                        column: x => x.RegularAccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LoanContracts",
                columns: table => new
                {
                    ContractNumber = table.Column<Guid>(nullable: false),
                    ProgramStartDate = table.Column<DateTime>(nullable: false),
                    ProgramEndDate = table.Column<DateTime>(nullable: false),
                    ValidUntil = table.Column<DateTime>(nullable: false),
                    IsCompleted = table.Column<bool>(nullable: false),
                    CompletedAt = table.Column<DateTime>(nullable: true),
                    Rate = table.Column<decimal>(nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    CurrencyId = table.Column<int>(nullable: false),
                    LoanTypeId = table.Column<int>(nullable: false),
                    LatestPaymentTransactionId = table.Column<int>(nullable: true),
                    RegularAccountNumber = table.Column<string>(nullable: true),
                    LoanPaymentAccountNumber = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanContracts", x => x.ContractNumber);
                    table.ForeignKey(
                        name: "FK_LoanContracts_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LoanContracts_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LoanContracts_Transactions_LatestPaymentTransactionId",
                        column: x => x.LatestPaymentTransactionId,
                        principalTable: "Transactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LoanContracts_Accounts_LoanPaymentAccountNumber",
                        column: x => x.LoanPaymentAccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LoanContracts_LoanTypes_LoanTypeId",
                        column: x => x.LoanTypeId,
                        principalTable: "LoanTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LoanContracts_Accounts_RegularAccountNumber",
                        column: x => x.RegularAccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 6, "Grodno" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 13, "Vinnytsia" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 12, "Odessa" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Minsk" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Vitebsk" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "Mogilev" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 4, "Gomel" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 5, "Brest" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 11, "Dnipropetrovsk" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 7, "Moscow" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 8, "Saint Petersburg" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 9, "Kiev" });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Name" },
                values: new object[] { 10, "Kharkiv" });

            migrationBuilder.InsertData(
                table: "CountriesOfCitizenship",
                columns: new[] { "Id", "Country" },
                values: new object[] { 1, "Belarus" });

            migrationBuilder.InsertData(
                table: "CountriesOfCitizenship",
                columns: new[] { "Id", "Country" },
                values: new object[] { 3, "Ukraine" });

            migrationBuilder.InsertData(
                table: "CountriesOfCitizenship",
                columns: new[] { "Id", "Country" },
                values: new object[] { 2, "Russia" });

            migrationBuilder.InsertData(
                table: "Currencies",
                columns: new[] { "Id", "Code" },
                values: new object[] { 5, "USD" });

            migrationBuilder.InsertData(
                table: "Currencies",
                columns: new[] { "Id", "Code" },
                values: new object[] { 3, "UAH" });

            migrationBuilder.InsertData(
                table: "Currencies",
                columns: new[] { "Id", "Code" },
                values: new object[] { 4, "EUR" });

            migrationBuilder.InsertData(
                table: "Currencies",
                columns: new[] { "Id", "Code" },
                values: new object[] { 1, "BYN" });

            migrationBuilder.InsertData(
                table: "Currencies",
                columns: new[] { "Id", "Code" },
                values: new object[] { 2, "RUB" });

            migrationBuilder.InsertData(
                table: "DepositTypes",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Revocable" });

            migrationBuilder.InsertData(
                table: "DepositTypes",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Irrevocable" });

            migrationBuilder.InsertData(
                table: "Disabilities",
                columns: new[] { "Id", "Description" },
                values: new object[] { 7, "None" });

            migrationBuilder.InsertData(
                table: "Disabilities",
                columns: new[] { "Id", "Description" },
                values: new object[] { 6, "Learning" });

            migrationBuilder.InsertData(
                table: "Disabilities",
                columns: new[] { "Id", "Description" },
                values: new object[] { 4, "Mental" });

            migrationBuilder.InsertData(
                table: "Disabilities",
                columns: new[] { "Id", "Description" },
                values: new object[] { 5, "Intellectual" });

            migrationBuilder.InsertData(
                table: "Disabilities",
                columns: new[] { "Id", "Description" },
                values: new object[] { 2, "Visual" });

            migrationBuilder.InsertData(
                table: "Disabilities",
                columns: new[] { "Id", "Description" },
                values: new object[] { 1, "Physical" });

            migrationBuilder.InsertData(
                table: "Disabilities",
                columns: new[] { "Id", "Description" },
                values: new object[] { 3, "Hearing" });

            migrationBuilder.InsertData(
                table: "LoanTypes",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Annuity" });

            migrationBuilder.InsertData(
                table: "LoanTypes",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Differential" });

            migrationBuilder.InsertData(
                table: "MaritalStatuses",
                columns: new[] { "Id", "Description" },
                values: new object[] { 4, "Single" });

            migrationBuilder.InsertData(
                table: "MaritalStatuses",
                columns: new[] { "Id", "Description" },
                values: new object[] { 1, "Married" });

            migrationBuilder.InsertData(
                table: "MaritalStatuses",
                columns: new[] { "Id", "Description" },
                values: new object[] { 2, "Widowed" });

            migrationBuilder.InsertData(
                table: "MaritalStatuses",
                columns: new[] { "Id", "Description" },
                values: new object[] { 3, "Divorced" });

            migrationBuilder.InsertData(
                table: "MobileCarriers",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "life:)" });

            migrationBuilder.InsertData(
                table: "MobileCarriers",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "A1" });

            migrationBuilder.InsertData(
                table: "MobileCarriers",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "MTS" });

            migrationBuilder.InsertData(
                table: "Settings",
                columns: new[] { "Key", "Value" },
                values: new object[] { "DateDaysOffset", "0" });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_CurrencyId",
                table: "Accounts",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_CustomerId",
                table: "Accounts",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_BirthInfos_CustomerId",
                table: "BirthInfos",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_CustomerId",
                table: "Contacts",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customers_DisabilityId",
                table: "Customers",
                column: "DisabilityId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_MaritalStatusId",
                table: "Customers",
                column: "MaritalStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_DepositContracts_CurrencyId",
                table: "DepositContracts",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_DepositContracts_CustomerId",
                table: "DepositContracts",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_DepositContracts_DepositAccountNumber",
                table: "DepositContracts",
                column: "DepositAccountNumber");

            migrationBuilder.CreateIndex(
                name: "IX_DepositContracts_DepositTypeId",
                table: "DepositContracts",
                column: "DepositTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DepositContracts_LatestInterestTransactionId",
                table: "DepositContracts",
                column: "LatestInterestTransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_DepositContracts_RegularAccountNumber",
                table: "DepositContracts",
                column: "RegularAccountNumber");

            migrationBuilder.CreateIndex(
                name: "IX_IncomesPerMonth_CurrencyId",
                table: "IncomesPerMonth",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_IncomesPerMonth_CustomerId",
                table: "IncomesPerMonth",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LoanContracts_CurrencyId",
                table: "LoanContracts",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanContracts_CustomerId",
                table: "LoanContracts",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanContracts_LatestPaymentTransactionId",
                table: "LoanContracts",
                column: "LatestPaymentTransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanContracts_LoanPaymentAccountNumber",
                table: "LoanContracts",
                column: "LoanPaymentAccountNumber");

            migrationBuilder.CreateIndex(
                name: "IX_LoanContracts_LoanTypeId",
                table: "LoanContracts",
                column: "LoanTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanContracts_RegularAccountNumber",
                table: "LoanContracts",
                column: "RegularAccountNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Passports_CitizenshipId",
                table: "Passports",
                column: "CitizenshipId");

            migrationBuilder.CreateIndex(
                name: "IX_Passports_CustomerId",
                table: "Passports",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlaceOfRegistrations_CityId",
                table: "PlaceOfRegistrations",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceOfRegistrations_CustomerId",
                table: "PlaceOfRegistrations",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlacesOfLiving_CityId",
                table: "PlacesOfLiving",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_PlacesOfLiving_CustomerId",
                table: "PlacesOfLiving",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_CurrencyId",
                table: "Transactions",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ReceiverAccountNumber",
                table: "Transactions",
                column: "ReceiverAccountNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_SenderAccountNumber",
                table: "Transactions",
                column: "SenderAccountNumber");

            migrationBuilder.CreateIndex(
                name: "IX_WorkInfos_CustomerId",
                table: "WorkInfos",
                column: "CustomerId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BirthInfos");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "DepositContracts");

            migrationBuilder.DropTable(
                name: "IncomesPerMonth");

            migrationBuilder.DropTable(
                name: "LoanContracts");

            migrationBuilder.DropTable(
                name: "MobileCarriers");

            migrationBuilder.DropTable(
                name: "Passports");

            migrationBuilder.DropTable(
                name: "PlaceOfRegistrations");

            migrationBuilder.DropTable(
                name: "PlacesOfLiving");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "WorkInfos");

            migrationBuilder.DropTable(
                name: "DepositTypes");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "LoanTypes");

            migrationBuilder.DropTable(
                name: "CountriesOfCitizenship");

            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Currencies");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Disabilities");

            migrationBuilder.DropTable(
                name: "MaritalStatuses");
        }
    }
}
