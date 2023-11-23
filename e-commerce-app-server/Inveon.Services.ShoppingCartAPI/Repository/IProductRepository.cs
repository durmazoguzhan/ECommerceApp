using Inveon.Services.ShoppingCartAPI.Models.Dto;

namespace Inveon.Services.ShoppingCartAPI.Repository
{
    public interface IProductRepository
    {
        Task<ProductDto> GetProduct(int productId);
    }
}
