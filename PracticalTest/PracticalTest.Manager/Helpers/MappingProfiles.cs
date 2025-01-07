using AutoMapper;
using PracticalTest.Entities.Entites;
using PracticalTest.Manager.EntityDtos;

namespace PracticalTest.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<ProductType, ProductTypeDto>().ReverseMap();
            CreateMap<ProductBrand, ProductBrandDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderItem, OrderItemDto>().ReverseMap();
            CreateMap<OrderPayment, OrderPaymentDto>().ReverseMap();

            CreateMap<Order,OrderInvoiceDto>()
                 .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customers.Name));
                
        }
    }
}
