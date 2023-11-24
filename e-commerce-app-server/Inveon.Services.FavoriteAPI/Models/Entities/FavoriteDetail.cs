using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Inveon.Services.FavoriteAPI.Models.Entities
{
    public class FavoriteDetail
    {
        [Key]
        public int Id { get; set; }

        public int FavoriteHeaderId { get; set; }
        [ForeignKey("FavoriteHeaderId")]
        public virtual FavoriteHeader FavoriteHeader { get; set; }

        [Required]
        public int ProductId { get; set; }
    }
}
