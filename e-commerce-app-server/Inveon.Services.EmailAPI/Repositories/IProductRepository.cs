using Inveon.Services.EmailAPI.Models.DTOs;

namespace Inveon.Services.EmailAPI.Repositories
{
    public interface IProductRepository
    {
        Task<ProductDto> GetProduct(int productId);
    }
}
