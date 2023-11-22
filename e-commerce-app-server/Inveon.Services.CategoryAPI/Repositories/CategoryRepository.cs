using AutoMapper;
using Inveon.Services.CategoryAPI.DbContexts;
using Inveon.Services.CategoryAPI.Models.DTOs;
using Inveon.Services.CategoryAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Services.CategoryAPI.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;

        public CategoryRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        async Task<CategoryDto> ICategoryRepository.CreateUpdateCategory(CategoryDto categoryDto)
        {
            Category category = _mapper.Map<CategoryDto, Category>(categoryDto);
            if (category.Id > 0)
                _db.Categories.Update(category);
            else
                _db.Categories.Add(category);
            await _db.SaveChangesAsync();
            return _mapper.Map<Category, CategoryDto>(category);
        }

        async Task<bool> ICategoryRepository.DeleteCategory(int categoryId)
        {
            try
            {
                Category category = await _db.Categories.FirstOrDefaultAsync(u => u.Id == categoryId);
                if (category == null)
                    return false;
                else
                {
                    _db.Categories.Remove(category);
                    await _db.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception) { return false; }
        }

        async Task<CategoryDto> ICategoryRepository.GetCategoryById(int categoryId)
        {
            Category category = await _db.Categories.Where(x => x.Id == categoryId).FirstOrDefaultAsync();
            return _mapper.Map<CategoryDto>(category);
        }

        async Task<IEnumerable<CategoryDto>> ICategoryRepository.GetCategories()
        {
            List<Category> categoryList = await _db.Categories.ToListAsync();
            return _mapper.Map<List<CategoryDto>>(categoryList);
        }
    }
}
