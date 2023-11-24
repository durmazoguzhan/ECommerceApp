namespace Inveon.Services.OrderAPI.Models.DTOs
{
    public class CartDetailsDto
    {
        public int Id { get; set; }
        public int CartHeaderId { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; }
        public string? Size { get; set; }
    }
}
