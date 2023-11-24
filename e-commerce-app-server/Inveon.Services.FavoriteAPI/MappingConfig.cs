using AutoMapper;
using Inveon.Services.FavoriteAPI.Models.DTOs;
using Inveon.Services.FavoriteAPI.Models.Entities;

namespace Inveon.Services.FavoriteAPI
{
    public class MappingConfig : Profile
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<FavoriteHeader, FavoriteHeaderDto>().ReverseMap();
                config.CreateMap<FavoriteDetail, FavoriteDetailDto>().ReverseMap();
                config.CreateMap<Favorite, FavoriteDto>().ReverseMap();
            });

            return mappingConfig;
        }
    }
}
