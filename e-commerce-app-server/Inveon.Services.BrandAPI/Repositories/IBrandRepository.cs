using Inveon.Services.BrandAPI.Models.DTOs;

namespace Inveon.Services.BrandAPI.Repositories
{
    public interface IBrandRepository
    {
        Task<IEnumerable<BrandDto>> GetBrands();
        Task<BrandDto> GetBrandById(int brandId);
        Task<BrandDto> CreateUpdateBrand(BrandDto brandDto);
        Task<bool> DeleteBrand(int brandId);
    }
}
