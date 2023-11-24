using Inveon.Services.FavoriteAPI.Models.DTOs;

namespace Inveon.Services.FavoriteAPI.Repositories
{
    public interface IFavoriteRepository
    {
        Task<FavoriteDto> GetFavoriteByUserId(int userId);
        FavoriteDto GetFavoriteByUserIdNonAsync(int userId);
        Task<FavoriteDto> CreateUpdateFavorite(FavoriteDto favoriteDto);
        Task<bool> RemoveFromFavorite(int favoriteDetailsId);
        Task<bool> ClearFavorite(int userId);
    }
}
