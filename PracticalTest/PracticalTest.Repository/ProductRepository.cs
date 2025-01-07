using Microsoft.EntityFrameworkCore;
using PracticalTest.Entities.Entites;
using PracticalTest.Entities.Helper;
using PracticalTest.Repository.Context;
using PracticalTest.Repository.Contract;
using System.Data;

namespace PracticalTest.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _db;
        public ProductRepository(StoreContext db)
        {
            _db = db;
        }

        public async Task<(List<Product> Product, int TotalCount)> GetAsync(ProductParameters productParams)
        {
            var query = _db.Products.AsQueryable();

            if (productParams.BrandId.HasValue)
            {
                query = query.Where(p => p.ProductBrandId == productParams.BrandId.Value);
            }

            if (productParams.TypeId.HasValue)
            {
                query = query.Where(p => p.ProductTypeId == productParams.TypeId.Value);
            }

            if (!string.IsNullOrEmpty(productParams.Search))
            {
                query = query.Where(p => p.Name.ToLower().Contains(productParams.Search) || p.BarNo.ToLower().Contains(productParams.Search) || p.GenericName.ToLower().Contains(productParams.Search));
            }

            if (!string.IsNullOrEmpty(productParams.OrderBy))
            {
                switch (productParams.OrderBy.ToLower())
                {
                    case "price":
                        query = query.OrderBy(p => p.Price);
                        break;
                    case "name":
                        query = query.OrderBy(p => p.Name);
                        break;
                    default:
                        query = query.OrderByDescending(p => p.Id); // Default sorting by Id
                        break;
                }
            }
            int totalCount = await query.CountAsync();
            query = query
                .Skip((productParams.PageNumber - 1) * productParams.PageSize)
                .Take(productParams.PageSize);

           var productList = await query.ToListAsync();

            return (Product: productList, TotalCount: totalCount);
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            var result = _db.Products.Where(c => c.Id == id);
            return await result.FirstOrDefaultAsync();
        }

        public Task<int> UpdateAsync(Product entity)
        {
            throw new NotImplementedException();
        }

        public Task AddAsync(Product entity)
        {
            throw new NotImplementedException();
        }

        Task IBaseRepository<Product>.UpdateAsync(Product entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Product>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
