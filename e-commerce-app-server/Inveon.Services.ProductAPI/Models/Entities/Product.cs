using System.ComponentModel.DataAnnotations;

namespace Inveon.Services.ProductAPI.Models.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(30000)]
        public string? Description { get; set; }

        [Required]
        public string Images { get; set; }

        [Required]
        [Range(0, 1000)]
        public int Quantity { get; set; }

        [Range(1, 100000)]
        [Required]
        public double ListPrice { get; set; }

        [Range(1, 100000)]
        [Required]
        public double SalePrice { get; set; }

        [Required]
        public int BrandId { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        [Required]
        public bool IsActive { get; set; }

    }
}
