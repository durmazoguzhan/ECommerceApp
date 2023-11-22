using AutoMapper;
using Inveon.Services.BrandAPI.DbContexts;
using Inveon.Services.BrandAPI.Models.DTOs;
using Inveon.Services.BrandAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Services.BrandAPI.Repositories
{
    public class BrandRepository : IBrandRepository
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;

        public BrandRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        async Task<BrandDto> IBrandRepository.CreateUpdateBrand(BrandDto brandDto)
        {
            Brand brand = _mapper.Map<BrandDto, Brand>(brandDto);
            if (brand.Id > 0)
                _db.Brands.Update(brand);
            else
                _db.Brands.Add(brand);
            await _db.SaveChangesAsync();
            return _mapper.Map<Brand, BrandDto>(brand);
        }

        async Task<bool> IBrandRepository.DeleteBrand(int brandId)
        {
            try
            {
                Brand brand = await _db.Brands.FirstOrDefaultAsync(u => u.Id == brandId);
                if (brand == null)
                    return false;
                else
                {
                    _db.Brands.Remove(brand);
                    await _db.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception) { return false; }
        }

        async Task<BrandDto> IBrandRepository.GetBrandById(int brandId)
        {
            Brand brand = await _db.Brands.Where(x => x.Id == brandId).FirstOrDefaultAsync();
            return _mapper.Map<BrandDto>(brand);
        }

        async Task<IEnumerable<BrandDto>> IBrandRepository.GetBrands()
        {
            List<Brand> brandList = await _db.Brands.ToListAsync();
            return _mapper.Map<List<BrandDto>>(brandList);
        }
    }
}
