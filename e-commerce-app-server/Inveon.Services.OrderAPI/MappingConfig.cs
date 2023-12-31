﻿using AutoMapper;
using Inveon.Services.OrderAPI.Models;
using Inveon.Services.OrderAPI.Models.DTOs;

namespace Inveon.Services.OrderAPI
{
    public class MappingConfig : Profile
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<OrderDto, OrderHeader>().ReverseMap();
                config.CreateMap<OrderHeaderDto, OrderHeader>().ReverseMap();
                config.CreateMap<OrderDetailDto, OrderDetail>().ReverseMap();
            });

            return mappingConfig;
        }
    }
}
