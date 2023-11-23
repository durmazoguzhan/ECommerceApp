using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Inveon.Services.OrderAPI.Models
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }
        public int OrderHeaderId { get; set; }
        [ForeignKey("OrderHeaderId")]
        public virtual OrderHeader OrderHeader { get; set; }
        public int ProductId { get; set; }
        public double Price { get; set; }
        public int Count { get; set; }
        public string? Size { get; set; }
    }
}
