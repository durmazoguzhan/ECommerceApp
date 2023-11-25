using Inveon.Services.EmailAPI.Models.DTOs;
using Newtonsoft.Json;

namespace Inveon.Services.EmailAPI.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly HttpClient _client;
        private const int MaxRetryCount = 5;
        private const int RetryDelayMilliseconds = 60000;

        public ProductRepository(HttpClient client)
        {
            _client = client;
        }

        public async Task<ProductDto> GetProduct(int productId)
        {
            for (int i = 0; i < MaxRetryCount; i++)
            {
                var response = await _client.GetAsync($"/api/products/{productId}");

                if (response.IsSuccessStatusCode)
                {
                    var apiContent = await response.Content.ReadAsStringAsync();
                    var resp = JsonConvert.DeserializeObject<ResponseDto>(apiContent);

                    if (resp.IsSuccess)
                    {
                        return JsonConvert.DeserializeObject<ProductDto>(Convert.ToString(resp.Result));
                    }
                }

                await Task.Delay(RetryDelayMilliseconds);
            }

            return new ProductDto();
        }
    }
}
