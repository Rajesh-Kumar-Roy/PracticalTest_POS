using Microsoft.EntityFrameworkCore;
using PracticalTest.Entities.Entites;
using PracticalTest.Repository.Context;
using PracticalTest.Repository.Contract;
using System.Data;

namespace PracticalTest.Repository
{
    public class ProductTypeRepository : IProductTypeRepository
    {
        private readonly StoreContext _db;
        public ProductTypeRepository(StoreContext db)
        {
            _db = db;
        }

        public async Task<List<ProductType>> GetAllAsync()
        {
            var result = await _db.ProductTypes.ToListAsync();
            return result.ToList();
        }

        public async Task<ProductType> GetByIdAsync(int id)
        {
            var result = _db.ProductTypes.Where(c => c.Id == id);
            return await result.FirstOrDefaultAsync();
        }
        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task AddAsync(ProductType entity)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(ProductType entity)
        {
            throw new NotImplementedException();
        }
    }
}
