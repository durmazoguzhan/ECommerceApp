using AutoMapper;
using Inveon.Services.FavoriteAPI.DbContexts;
using Inveon.Services.FavoriteAPI.Models.DTOs;
using Inveon.Services.FavoriteAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Services.FavoriteAPI.Repositories
{
    public class FavoriteRepository:IFavoriteRepository
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;

        public FavoriteRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<bool> ClearFavorite(int userId)
        {
            var favoriteHeaderFromDb = await _db.FavoriteHeaders.FirstOrDefaultAsync(u => u.UserId == userId);
            if (favoriteHeaderFromDb != null)
            {
                _db.FavoriteDetails
                    .RemoveRange(_db.FavoriteDetails.Where(u => u.FavoriteHeaderId == favoriteHeaderFromDb.Id));
                _db.FavoriteHeaders.Remove(favoriteHeaderFromDb);
                await _db.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<FavoriteDto> CreateUpdateFavorite(FavoriteDto favoriteDto)
        {
            Favorite favorite = _mapper.Map<Favorite>(favoriteDto);

            var favoriteHeaderFromDb = await _db.FavoriteHeaders.AsNoTracking()
                .FirstOrDefaultAsync(u => u.UserId == favorite.FavoriteHeader.UserId);

            if (favoriteHeaderFromDb == null)
            {
                _db.FavoriteHeaders.Add(favorite.FavoriteHeader);
                await _db.SaveChangesAsync();
                favoriteHeaderFromDb = await _db.FavoriteHeaders.AsNoTracking()
                .FirstOrDefaultAsync(u => u.UserId == favorite.FavoriteHeader.UserId);
            }

            var favoriteDetailsFromDb = await _db.FavoriteDetails.AsNoTracking().FirstOrDefaultAsync(
                u => u.ProductId == favorite.FavoriteDetails.FirstOrDefault().ProductId &&
                u.FavoriteHeaderId == favoriteHeaderFromDb.Id);

            if (favoriteDetailsFromDb == null)
            {
                foreach (var favoriteDetail in favorite.FavoriteDetails)
                {
                    favoriteDetail.FavoriteHeaderId = favoriteHeaderFromDb.Id;
                    _db.FavoriteDetails.Add(favoriteDetail);
                }
                await _db.SaveChangesAsync();
            }
            else
            {
                foreach (var favoriteDetail in favorite.FavoriteDetails)
                {
                    favoriteDetail.FavoriteHeaderId = favoriteHeaderFromDb.Id;
                    _db.FavoriteDetails.Update(favoriteDetail);
                }
                await _db.SaveChangesAsync();
            }

            return _mapper.Map<FavoriteDto>(favorite);

        }

        public async Task<FavoriteDto> GetFavoriteByUserId(int userId)
        {
            var favorite = new Favorite();
            favorite.FavoriteHeader = await _db.FavoriteHeaders.FirstOrDefaultAsync(u => u.UserId == userId);
            favorite.FavoriteDetails = _db.FavoriteDetails
                .Where(u => u.FavoriteHeaderId == favorite.FavoriteHeader.Id);

            return _mapper.Map<FavoriteDto>(favorite);
        }

        public FavoriteDto GetFavoriteByUserIdNonAsync(int userId)
        {
            Favorite favorite = new()
            {
                FavoriteHeader = new()
            };

            favorite.FavoriteDetails = _db.FavoriteDetails
                .Where(u => u.FavoriteHeaderId == favorite.FavoriteHeader.Id).Include(u => u.ProductId);

            return _mapper.Map<FavoriteDto>(favorite);
        }

        public async Task<bool> RemoveFromFavorite(int favoriteDetailsId)
        {
            try
            {
                FavoriteDetail favoriteDetails = await _db.FavoriteDetails
                    .FirstOrDefaultAsync(u => u.Id == favoriteDetailsId);

                int totalCountOfFavoriteItems = _db.FavoriteDetails
                    .Where(u => u.FavoriteHeaderId == favoriteDetails.FavoriteHeaderId).Count();

                _db.FavoriteDetails.Remove(favoriteDetails);
                if (totalCountOfFavoriteItems == 1)
                {
                    var favoriteHeaderToRemove = await _db.FavoriteHeaders
                        .FirstOrDefaultAsync(u => u.Id == favoriteDetails.FavoriteHeaderId);

                    _db.FavoriteHeaders.Remove(favoriteHeaderToRemove);
                }
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
