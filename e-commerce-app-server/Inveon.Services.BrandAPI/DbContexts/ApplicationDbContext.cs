using Inveon.Services.BrandAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Services.BrandAPI.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Brand> Brands { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 1, Name = "Ontrail" });
            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 2, Name = "Defacto" });
            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 3, Name = "Pull & Bear" });
            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 4, Name = "Koton" });
            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 5, Name = "Zara" });
            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 6, Name = "Bershka" });
            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 7, Name = "Nike" });
            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 8, Name = "Adidas" });
            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 9, Name = "Harley Davidson" });
            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 10, Name = "Avva" });
        }
    }
}
