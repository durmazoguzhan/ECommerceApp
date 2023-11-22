using System.ComponentModel.DataAnnotations;

namespace Inveon.Services.BrandAPI.Models.Entities
{
    public class Brand
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
