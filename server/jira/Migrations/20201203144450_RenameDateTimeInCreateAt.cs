using Microsoft.EntityFrameworkCore.Migrations;

namespace Jira.Migrations
{
    public partial class RenameDateTimeInCreateAt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "Comments",
                newName: "CreateAt");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreateAt",
                table: "Comments",
                newName: "DateTime");
        }
    }
}
