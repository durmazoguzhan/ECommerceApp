namespace Inveon.Services.OrderAPI.Models.DTOs
{
    public class OrderDetailDto
    {
        public int Id { get; set; }
        public int OrderHeaderId { get; set; }
        public virtual OrderHeaderDto OrderHeader { get; set; }
        public int ProductId { get; set; }
        public double Price { get; set; }
        public int Count { get; set; }
        public string? Size { get; set; }
    }
}
