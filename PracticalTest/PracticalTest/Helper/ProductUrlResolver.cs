﻿using AutoMapper;
using PracticalTest.Entities.Entites;
using PracticalTest.Manager.EntityDtos;


namespace PracticalTest.Helper
{
        public class ProductUrlResolver : IValueResolver<Product, ProductDto, string>
        {
            private readonly IConfiguration _config;

            public ProductUrlResolver(IConfiguration config)
            {
                _config = config;
            }
            public string Resolve(Product source, ProductDto destination, string destMember, ResolutionContext context)
            {
                if (!string.IsNullOrEmpty(source.PictureUrl))
                {
                    return _config["ApiUrl"] + source.PictureUrl;
                }
                return null;
            }
        }
}
