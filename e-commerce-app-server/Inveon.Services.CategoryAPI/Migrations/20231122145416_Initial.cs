using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Inveon.Services.CategoryAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentCategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name", "ParentCategoryId" },
                values: new object[,]
                {
                    { 1, "Kadın", null },
                    { 2, "Erkek", null },
                    { 3, "Çocuk", null },
                    { 4, "Giyim", 1 },
                    { 5, "Ayakkabı", 1 },
                    { 6, "Aksesuar", 1 },
                    { 7, "Mont", 4 },
                    { 8, "Eşofman Altı", 4 },
                    { 9, "Polar", 4 },
                    { 10, "Topuklu Ayakkabı", 5 },
                    { 11, "Sneaker", 5 },
                    { 12, "Bot", 5 },
                    { 13, "Atkı", 6 },
                    { 14, "Cüzdan", 6 },
                    { 15, "Saat", 6 },
                    { 16, "Giyim", 2 },
                    { 17, "Ayakkabı", 2 },
                    { 18, "Aksesuar", 2 },
                    { 19, "Mont", 16 },
                    { 20, "Eşofman Altı", 16 },
                    { 21, "Polar", 16 },
                    { 22, "Sneaker", 17 },
                    { 23, "Bot", 17 },
                    { 24, "Atkı", 18 },
                    { 25, "Cüzdan", 18 },
                    { 26, "Saat", 18 },
                    { 27, "Kız Çocuk", 3 },
                    { 28, "Erkek Çocuk", 3 },
                    { 29, "Mont", 27 },
                    { 30, "Eşofman Altı", 27 },
                    { 31, "Polar", 27 },
                    { 32, "Mont", 28 },
                    { 33, "Eşofman Altı", 28 },
                    { 34, "Polar", 28 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
