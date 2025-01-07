
using PracticalTest.Entities.Entites;
using PracticalTest.Entities.Helper;
using PracticalTest.Manager.EntityDtos;

namespace PracticalTest.Manager.Contract
{
    public interface IProductService: IBaseService<ProductDto>
    {
        Task<(List<ProductDto> Product, int TotalCount)> GetAsync(ProductParameters productParams);
    }
}
