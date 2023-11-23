using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inveon.Services.ShoppingCartAPI.Models
{
    public class CartDetail
    {
        [Key]
        public int Id { get; set; }

        public int CartHeaderId { get; set; }
        [ForeignKey("CartHeaderId")]
        public virtual CartHeader CartHeader { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int Count { get; set; }

        public string? Size { get; set; }
    }
}
