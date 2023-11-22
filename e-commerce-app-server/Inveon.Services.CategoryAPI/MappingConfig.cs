using AutoMapper;
using Inveon.Services.CategoryAPI.Models.DTOs;
using Inveon.Services.CategoryAPI.Models.Entities;

namespace Inveon.Services.CategoryAPI
{
    public class MappingConfig:Profile
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<CategoryDto, Category>().ReverseMap();
            });

            return mappingConfig;
        }
    }
}
