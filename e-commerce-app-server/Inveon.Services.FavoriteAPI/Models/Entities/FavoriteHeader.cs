using System.ComponentModel.DataAnnotations;

namespace Inveon.Services.FavoriteAPI.Models.Entities
{
    public class FavoriteHeader
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
    }
}
