
using PracticalTest.Entities.Entites;
using PracticalTest.Entities.Helper;

namespace PracticalTest.Repository.Contract
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Task<(List<Product> Product, int TotalCount)> GetAsync(ProductParameters productParams);
    }
}
