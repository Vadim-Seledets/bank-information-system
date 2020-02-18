using Microsoft.EntityFrameworkCore.Migrations;

namespace BankInformationSystem.Data.Migrations
{
    public partial class AddLoansAndAtmModulesEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LoanContracts_LoanType_LoanTypeId",
                table: "LoanContracts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LoanType",
                table: "LoanType");

            migrationBuilder.RenameTable(
                name: "LoanType",
                newName: "LoanTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LoanTypes",
                table: "LoanTypes",
                column: "Id");

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

            migrationBuilder.InsertData(
                table: "MobileCarriers",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "MTS" });

            migrationBuilder.InsertData(
                table: "MobileCarriers",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "life:)" });

            migrationBuilder.InsertData(
                table: "MobileCarriers",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "A1" });

            migrationBuilder.AddForeignKey(
                name: "FK_LoanContracts_LoanTypes_LoanTypeId",
                table: "LoanContracts",
                column: "LoanTypeId",
                principalTable: "LoanTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LoanContracts_LoanTypes_LoanTypeId",
                table: "LoanContracts");

            migrationBuilder.DropTable(
                name: "MobileCarriers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LoanTypes",
                table: "LoanTypes");

            migrationBuilder.RenameTable(
                name: "LoanTypes",
                newName: "LoanType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LoanType",
                table: "LoanType",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LoanContracts_LoanType_LoanTypeId",
                table: "LoanContracts",
                column: "LoanTypeId",
                principalTable: "LoanType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
