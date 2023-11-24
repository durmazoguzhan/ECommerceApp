using Inveon.Services.OrderAPI.Models.DTOs;

namespace Inveon.Services.OrderAPI.Messages
{
    public interface IProductRepository
    {
        Task<ProductDto> GetProduct(int productId);
    }
}
