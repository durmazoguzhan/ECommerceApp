namespace Inveon.Services.EmailAPI.Models
{
    public class ProductDetail
    {
        public string Name { get; set; }
        public int Count { get; set; }
        public string? Size { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
