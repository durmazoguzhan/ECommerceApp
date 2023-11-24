using Inveon.Services.FavoriteAPI.Models.DTOs;
using Inveon.Services.FavoriteAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.Services.FavoriteAPI.Controllers
{
    [Route("api/favorite")]
    public class FavoriteAPIController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepository;
        protected ResponseDto _response;

        public FavoriteAPIController(IFavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
            _response = new ResponseDto();
        }

        [HttpGet("GetFavorite/{userId}")]
        public async Task<object> GetFavorite(int userId)
        {
            try
            {
                FavoriteDto favoriteDto = await _favoriteRepository.GetFavoriteByUserId(userId);
                _response.Result = favoriteDto;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost]
        [Authorize]
        public async Task<object> Post([FromBody] FavoriteDto favoriteDto)
        {
            try
            {
                FavoriteDto model = await _favoriteRepository.CreateUpdateFavorite(favoriteDto);
                _response.Result = model;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages
                     = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost("UpdateFavorite")]
        public async Task<object> UpdateFavorite(FavoriteDto favoriteDto)
        {
            try
            {
                FavoriteDto favoriteDt = await _favoriteRepository.CreateUpdateFavorite(favoriteDto);
                _response.Result = favoriteDt;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost("RemoveFavorite")]
        public async Task<object> RemoveFavorite([FromBody] int favoriteId)
        {
            try
            {
                bool isSuccess = await _favoriteRepository.RemoveFromFavorite(favoriteId);
                _response.Result = isSuccess;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}
