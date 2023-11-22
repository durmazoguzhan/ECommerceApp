using Inveon.Services.BrandAPI.Models.DTOs;
using Inveon.Services.BrandAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.Services.BrandAPI.Controllers
{
    [Route("api/brands")]
    public class BrandAPIController : ControllerBase
    {
        protected ResponseDto _response;
        private IBrandRepository _brandRepository;

        public BrandAPIController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
            _response = new ResponseDto();
        }

        [HttpGet]
        public async Task<object> Get()
        {
            try
            {
                IEnumerable<BrandDto> brandDtos = await _brandRepository.GetBrands();
                _response.Result = brandDtos;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<object> Get(int id)
        {
            try
            {
                BrandDto brandDto = await _brandRepository.GetBrandById(id);
                _response.Result = brandDto;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost]
        public async Task<object> Post([FromBody] BrandDto brandDto)
        {
            try
            {
                BrandDto model = await _brandRepository.CreateUpdateBrand(brandDto);
                _response.Result = model;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPut]
        public async Task<object> Put([FromBody] BrandDto brandDto)
        {
            try
            {
                BrandDto model = await _brandRepository.CreateUpdateBrand(brandDto);
                _response.Result = model;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<object> Delete(int id)
        {
            try
            {
                bool isSuccess = await _brandRepository.DeleteBrand(id);
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
