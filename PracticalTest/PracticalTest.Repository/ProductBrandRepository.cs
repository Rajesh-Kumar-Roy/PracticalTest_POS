using Microsoft.EntityFrameworkCore;
using PracticalTest.Entities.Entites;
using PracticalTest.Repository.Context;
using PracticalTest.Repository.Contract;
using System.Data;

namespace PracticalTest.Repository
{
    public class ProductBrandRepository : IProductBrandRepository
    {
        private readonly StoreContext _db;
        public ProductBrandRepository(StoreContext db)
        {
            _db = db;
        }

        public async Task<List<ProductBrand>> GetAllAsync()
        {
            var result = await _db.ProductBrands.ToListAsync();
            return result.ToList();
        }

        public async Task<ProductBrand> GetByIdAsync(int id)
        {
            var result = _db.ProductBrands.Where(c => c.Id == id);
            return await result.FirstOrDefaultAsync();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task AddAsync(ProductBrand entity)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(ProductBrand entity)
        {
            throw new NotImplementedException();
        }
    }
}
