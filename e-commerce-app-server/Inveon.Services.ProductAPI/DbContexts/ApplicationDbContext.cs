using Inveon.Services.ProductAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Services.ProductAPI.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 1,
                Name = "Cozy Outdoors Sherpa Polar – Kiremit",
                Description = "%100 geri dönüştürülmüş polyester ile üretilmiştir. İçi polarlı, dışı tüylü olduğu için soğuk kış günlerinin kurtarıcısıdır. Dokuma etiket tasarımına sahiptir. Düğmelerde hindistan cevizi kabuğu kullanılmıştır. Unisex, her yaş ve bedene uygun olarak üretilmiştir. Ürünlerimiz ilk aşamadan itibaren çevreye ve ekolojik dengeye duyarlı üretimi benimseyen Oeko-Tex 100 standart sertifikasına sahiptir.",
                Images = "1_1.webp,1_2.webp,1_3.webp,1_4.webp",
                Quantity = 100,
                ListPrice = 1495.00,
                SalePrice = 1200.99,
                BrandId = 1,
                CategoryId = 21,
                CreateDate = DateTime.Now,
                IsActive = true
            });
            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 2,
                Name = "Cozy Outdoors Sherpa Polar – Krem",
                Description = "%100 geri dönüştürülmüş polyester ile üretilmiştir. İçi polarlı, dışı tüylü olduğu için soğuk kış günlerinin kurtarıcısıdır. Dokuma etiket tasarımına sahiptir. Düğmelerde hindistan cevizi kabuğu kullanılmıştır. Unisex, her yaş ve bedene uygun olarak üretilmiştir. Ürünlerimiz ilk aşamadan itibaren çevreye ve ekolojik dengeye duyarlı üretimi benimseyen Oeko-Tex 100 standart sertifikasına sahiptir.",
                Images = "2_1.webp,2_2.webp,2_3.webp,2_4.webp",
                Quantity = 100,
                ListPrice = 1695.00,
                SalePrice = 1695.00,
                BrandId = 1,
                CategoryId = 9,
                CreateDate = DateTime.Now,
                IsActive = true
            });
            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 3,
                Name = "Coool Jogger Ince Kumaş Eşofman Altı",
                Description = "Coool jogger ince kumaş eşofman altı, modern tasarımıyla şıklığı rahatlıkla bir araya getirirken, ince kumaşıyla da sizi serin ve rahat tutar. Spor yaparken veya günlük yaşamda rahat ve tarz bir seçenektir. Pamuk 60%,poliester 40%",
                Images = "3_1.webp,3_2.webp",
                Quantity = 50,
                ListPrice = 250.00,
                SalePrice = 209.99,
                BrandId = 2,
                CategoryId = 8,
                CreateDate = DateTime.Now,
                IsActive = true
            });
            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 4,
                Name = "Kapüşonlu şişme mont",
                Description = "Modelin boyu: 177 cm. Farklı renkleri mevcut, fermuarlı, kapüşonlu, dik yaka, yan cepli, şişme mont. 100% polyester KURU TEMİZLEME YAPILAMAZ - 30ºC DE MAKİNADA HASSAS YIKAMA - BEYAZLATICI KULLANILMAZ - 110ºC DERECEDE ÜTÜLEME - MERDANELI TEMIZLEME YAPILAMAZ",
                Images = "4_1.webp,4_2.webp",
                Quantity = 50,
                ListPrice = 1390.00,
                SalePrice = 1390.00,
                BrandId = 3,
                CategoryId = 7,
                CreateDate = DateTime.Now,
                IsActive = true
            });
        }
    }
}
