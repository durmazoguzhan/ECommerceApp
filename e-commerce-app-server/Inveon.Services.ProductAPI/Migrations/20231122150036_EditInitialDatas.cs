using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inveon.Services.ProductAPI.Migrations
{
    /// <inheritdoc />
    public partial class EditInitialDatas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CategoryId", "CreateDate" },
                values: new object[] { 21, new DateTime(2023, 11, 22, 18, 0, 36, 889, DateTimeKind.Local).AddTicks(273) });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CategoryId", "CreateDate" },
                values: new object[] { 9, new DateTime(2023, 11, 22, 18, 0, 36, 889, DateTimeKind.Local).AddTicks(308) });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "CreateDate" },
                values: new object[] { 8, new DateTime(2023, 11, 22, 18, 0, 36, 889, DateTimeKind.Local).AddTicks(316) });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CategoryId", "CreateDate" },
                values: new object[] { 7, new DateTime(2023, 11, 22, 18, 0, 36, 889, DateTimeKind.Local).AddTicks(323) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CategoryId", "CreateDate" },
                values: new object[] { 1, new DateTime(2023, 11, 21, 2, 34, 5, 300, DateTimeKind.Local).AddTicks(1545) });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CategoryId", "CreateDate" },
                values: new object[] { 1, new DateTime(2023, 11, 21, 2, 34, 5, 300, DateTimeKind.Local).AddTicks(1586) });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "CreateDate" },
                values: new object[] { 2, new DateTime(2023, 11, 21, 2, 34, 5, 300, DateTimeKind.Local).AddTicks(1595) });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CategoryId", "CreateDate" },
                values: new object[] { 3, new DateTime(2023, 11, 21, 2, 34, 5, 300, DateTimeKind.Local).AddTicks(1603) });
        }
    }
}
