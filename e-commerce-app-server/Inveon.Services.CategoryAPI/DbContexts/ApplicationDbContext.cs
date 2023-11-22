using Inveon.Services.CategoryAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Services.CategoryAPI.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Category>().HasData(new Category { Id = 1, Name = "Kadın" });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 2, Name = "Erkek" });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 3, Name = "Çocuk" });

            #region Kadın

            modelBuilder.Entity<Category>().HasData(new Category { Id = 4, Name = "Giyim", ParentCategoryId = 1 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 5, Name = "Ayakkabı", ParentCategoryId = 1 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 6, Name = "Aksesuar", ParentCategoryId = 1 });

            #region Kadın>Giyim

            modelBuilder.Entity<Category>().HasData(new Category { Id = 7, Name = "Mont", ParentCategoryId = 4 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 8, Name = "Eşofman Altı", ParentCategoryId = 4 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 9, Name = "Polar", ParentCategoryId = 4 });

            #endregion
            #region Kadın>Ayakkabı

            modelBuilder.Entity<Category>().HasData(new Category { Id = 10, Name = "Topuklu Ayakkabı", ParentCategoryId = 5 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 11, Name = "Sneaker", ParentCategoryId = 5 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 12, Name = "Bot", ParentCategoryId = 5 });

            #endregion
            #region Kadın>Aksesuar

            modelBuilder.Entity<Category>().HasData(new Category { Id = 13, Name = "Atkı", ParentCategoryId = 6 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 14, Name = "Cüzdan", ParentCategoryId = 6 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 15, Name = "Saat", ParentCategoryId = 6 });

            #endregion

            #endregion
            #region Erkek

            modelBuilder.Entity<Category>().HasData(new Category { Id = 16, Name = "Giyim", ParentCategoryId = 2 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 17, Name = "Ayakkabı", ParentCategoryId = 2 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 18, Name = "Aksesuar", ParentCategoryId = 2 });

            #region Erkek>Giyim

            modelBuilder.Entity<Category>().HasData(new Category { Id = 19, Name = "Mont", ParentCategoryId = 16 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 20, Name = "Eşofman Altı", ParentCategoryId = 16 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 21, Name = "Polar", ParentCategoryId = 16 });

            #endregion
            #region Erkek>Ayakkabı

            modelBuilder.Entity<Category>().HasData(new Category { Id = 22, Name = "Sneaker", ParentCategoryId = 17 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 23, Name = "Bot", ParentCategoryId = 17 });

            #endregion
            #region Erkek>Aksesuar

            modelBuilder.Entity<Category>().HasData(new Category { Id = 24, Name = "Atkı", ParentCategoryId = 18 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 25, Name = "Cüzdan", ParentCategoryId = 18 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 26, Name = "Saat", ParentCategoryId = 18 });

            #endregion

            #endregion
            #region Çocuk

            modelBuilder.Entity<Category>().HasData(new Category { Id = 27, Name = "Kız Çocuk", ParentCategoryId = 3 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 28, Name = "Erkek Çocuk", ParentCategoryId = 3 });

            #region Çocuk>Kız Çocuk

            modelBuilder.Entity<Category>().HasData(new Category { Id = 29, Name = "Mont", ParentCategoryId = 27 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 30, Name = "Eşofman Altı", ParentCategoryId = 27 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 31, Name = "Polar", ParentCategoryId = 27 });

            #endregion
            #region Çocuk>Erkek Çocuk

            modelBuilder.Entity<Category>().HasData(new Category { Id = 32, Name = "Mont", ParentCategoryId = 28 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 33, Name = "Eşofman Altı", ParentCategoryId = 28 });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 34, Name = "Polar", ParentCategoryId = 28 });

            #endregion

            #endregion
        }
    }
}
