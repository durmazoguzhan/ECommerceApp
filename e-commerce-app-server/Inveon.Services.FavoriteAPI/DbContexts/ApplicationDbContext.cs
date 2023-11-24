using Inveon.Services.FavoriteAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Services.FavoriteAPI.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<FavoriteHeader> FavoriteHeaders { get; set; }
        public DbSet<FavoriteDetail> FavoriteDetails { get; set; }

    }
}
