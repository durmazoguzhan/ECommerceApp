namespace Inveon.Web.Models
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Images { get; set; }
        public int Quantity { get; set; }
        public double ListPrice { get; set; }
        public double SalePrice { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsActive { get; set; }

        public int Count { get; set; }
        public string? Size { get; set; }
    }
}
