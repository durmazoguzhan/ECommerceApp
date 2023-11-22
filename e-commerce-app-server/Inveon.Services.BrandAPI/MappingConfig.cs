using AutoMapper;
using Inveon.Services.BrandAPI.Models.DTOs;
using Inveon.Services.BrandAPI.Models.Entities;

namespace Inveon.Services.BrandAPI
{
    public class MappingConfig : Profile
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<BrandDto, Brand>().ReverseMap();
            });

            return mappingConfig;
        }
    }
}
