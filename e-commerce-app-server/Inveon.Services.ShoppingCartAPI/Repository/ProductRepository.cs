using Inveon.Services.ShoppingCartAPI.Models.Dto;
using Newtonsoft.Json;

namespace Inveon.Services.ShoppingCartAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly HttpClient _client;

        public ProductRepository(HttpClient client)
        {
            _client = client;
        }

        public async Task<ProductDto> GetProduct(int productId)
        {
            var response = await _client.GetAsync($"/api/products/{productId}");
            var apiContent = await response.Content.ReadAsStringAsync();
            var resp = JsonConvert.DeserializeObject<ResponseDto>(apiContent);
            if (resp.IsSuccess)
            {
                return JsonConvert.DeserializeObject<ProductDto>(Convert.ToString(resp.Result));
            }
            return new ProductDto();
        }
    }
}
