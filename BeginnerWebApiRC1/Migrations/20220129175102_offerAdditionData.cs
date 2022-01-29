using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeginnerWebApiRC1.Migrations
{
    public partial class offerAdditionData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanySize",
                table: "Offers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Duties",
                table: "Offers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ExperienceRequired",
                table: "Offers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "JobType",
                table: "Offers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "additional_data",
                table: "Offers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanySize",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "Duties",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "ExperienceRequired",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "JobType",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "additional_data",
                table: "Offers");
        }
    }
}
