using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BankInformationSystem.Data.Migrations
{
    public partial class AddEntitiesForDepositsAndLoanModules : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    AccountNumber = table.Column<string>(nullable: false),
                    Activity = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    CurrencyId = table.Column<int>(nullable: false),
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
                name: "LoanType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanType", x => x.Id);
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
                        name: "FK_LoanContracts_LoanType_LoanTypeId",
                        column: x => x.LoanTypeId,
                        principalTable: "LoanType",
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
                table: "DepositTypes",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Revocable" });

            migrationBuilder.InsertData(
                table: "DepositTypes",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Irrevocable" });

            migrationBuilder.InsertData(
                table: "LoanType",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Annuity" });

            migrationBuilder.InsertData(
                table: "LoanType",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Differential" });

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DepositContracts");

            migrationBuilder.DropTable(
                name: "LoanContracts");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "DepositTypes");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "LoanType");

            migrationBuilder.DropTable(
                name: "Accounts");
        }
    }
}
