using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Inveon.Services.ProductAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", maxLength: 30000, nullable: false),
                    Images = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ListPrice = table.Column<double>(type: "float", nullable: false),
                    SalePrice = table.Column<double>(type: "float", nullable: false),
                    BrandId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "BrandId", "CategoryId", "CreateDate", "Description", "Images", "IsActive", "ListPrice", "Name", "Quantity", "SalePrice" },
                values: new object[,]
                {
                    { 1, 1, 1, new DateTime(2023, 11, 21, 2, 34, 5, 300, DateTimeKind.Local).AddTicks(1545), "%100 geri dönüştürülmüş polyester ile üretilmiştir. İçi polarlı, dışı tüylü olduğu için soğuk kış günlerinin kurtarıcısıdır. Dokuma etiket tasarımına sahiptir. Düğmelerde hindistan cevizi kabuğu kullanılmıştır. Unisex, her yaş ve bedene uygun olarak üretilmiştir. Ürünlerimiz ilk aşamadan itibaren çevreye ve ekolojik dengeye duyarlı üretimi benimseyen Oeko-Tex 100 standart sertifikasına sahiptir.", "1_1.webp,1_2.webp,1_3.webp,1_4.webp", true, 1495.0, "Cozy Outdoors Sherpa Polar – Kiremit", 100, 1200.99 },
                    { 2, 1, 1, new DateTime(2023, 11, 21, 2, 34, 5, 300, DateTimeKind.Local).AddTicks(1586), "%100 geri dönüştürülmüş polyester ile üretilmiştir. İçi polarlı, dışı tüylü olduğu için soğuk kış günlerinin kurtarıcısıdır. Dokuma etiket tasarımına sahiptir. Düğmelerde hindistan cevizi kabuğu kullanılmıştır. Unisex, her yaş ve bedene uygun olarak üretilmiştir. Ürünlerimiz ilk aşamadan itibaren çevreye ve ekolojik dengeye duyarlı üretimi benimseyen Oeko-Tex 100 standart sertifikasına sahiptir.", "2_1.webp,2_2.webp,2_3.webp,2_4.webp", true, 1695.0, "Cozy Outdoors Sherpa Polar – Krem", 100, 1695.0 },
                    { 3, 2, 2, new DateTime(2023, 11, 21, 2, 34, 5, 300, DateTimeKind.Local).AddTicks(1595), "Coool jogger ince kumaş eşofman altı, modern tasarımıyla şıklığı rahatlıkla bir araya getirirken, ince kumaşıyla da sizi serin ve rahat tutar. Spor yaparken veya günlük yaşamda rahat ve tarz bir seçenektir. Pamuk 60%,poliester 40%", "3_1.webp,3_2.webp", true, 250.0, "Coool Jogger Ince Kumaş Eşofman Altı", 50, 209.99000000000001 },
                    { 4, 3, 3, new DateTime(2023, 11, 21, 2, 34, 5, 300, DateTimeKind.Local).AddTicks(1603), "Modelin boyu: 177 cm. Farklı renkleri mevcut, fermuarlı, kapüşonlu, dik yaka, yan cepli, şişme mont. 100% polyester KURU TEMİZLEME YAPILAMAZ - 30ºC DE MAKİNADA HASSAS YIKAMA - BEYAZLATICI KULLANILMAZ - 110ºC DERECEDE ÜTÜLEME - MERDANELI TEMIZLEME YAPILAMAZ", "4_1.webp,4_2.webp", true, 1390.0, "Kapüşonlu şişme mont", 50, 1390.0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
