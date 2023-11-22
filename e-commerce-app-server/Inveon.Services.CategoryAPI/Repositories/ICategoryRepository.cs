using Inveon.Services.CategoryAPI.Models.DTOs;

namespace Inveon.Services.CategoryAPI.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<CategoryDto>> GetCategories();
        Task<CategoryDto> GetCategoryById(int categoryId);
        Task<CategoryDto> CreateUpdateCategory(CategoryDto categoryDto);
        Task<bool> DeleteCategory(int categoryId);
    }
}
