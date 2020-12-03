using Microsoft.EntityFrameworkCore.Migrations;

namespace Jira.Migrations
{
    public partial class AddManyToManyLabelTicket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TicketId",
                table: "Labels");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Tickets",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Labels",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Comments",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Categories",
                newName: "Id");

            migrationBuilder.CreateTable(
                name: "LabelTicket",
                columns: table => new
                {
                    LabelsId = table.Column<int>(type: "int", nullable: false),
                    TicketsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LabelTicket", x => new { x.LabelsId, x.TicketsId });
                    table.ForeignKey(
                        name: "FK_LabelTicket_Labels_LabelsId",
                        column: x => x.LabelsId,
                        principalTable: "Labels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LabelTicket_Tickets_TicketsId",
                        column: x => x.TicketsId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LabelTicket_TicketsId",
                table: "LabelTicket",
                column: "TicketsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LabelTicket");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Tickets",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Labels",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Comments",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Categories",
                newName: "id");

            migrationBuilder.AddColumn<int>(
                name: "TicketId",
                table: "Labels",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
