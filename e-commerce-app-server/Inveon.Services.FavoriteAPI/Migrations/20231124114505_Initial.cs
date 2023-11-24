using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inveon.Services.FavoriteAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FavoriteHeaders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavoriteHeaders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FavoriteDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FavoriteHeaderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavoriteDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FavoriteDetails_FavoriteHeaders_FavoriteHeaderId",
                        column: x => x.FavoriteHeaderId,
                        principalTable: "FavoriteHeaders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteDetails_FavoriteHeaderId",
                table: "FavoriteDetails",
                column: "FavoriteHeaderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FavoriteDetails");

            migrationBuilder.DropTable(
                name: "FavoriteHeaders");
        }
    }
}
