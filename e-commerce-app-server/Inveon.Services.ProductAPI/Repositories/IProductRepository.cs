﻿using Inveon.Services.ProductAPI.Models.DTOs;

namespace Inveon.Services.ProductAPI.Repositories
{
    public interface IProductRepository
    { 
        Task<IEnumerable<ProductDto>> GetProducts();
        Task<ProductDto> GetProductById(int productId);
        Task<ProductDto> CreateUpdateProduct(ProductDto productDto);
        Task<bool> DeleteProduct(int productId);
    }
}
