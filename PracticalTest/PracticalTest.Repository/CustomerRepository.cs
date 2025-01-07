using Microsoft.EntityFrameworkCore;
using PracticalTest.Entities.Entites;
using PracticalTest.Repository.Context;
using PracticalTest.Repository.Contract;

namespace PracticalTest.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly StoreContext _db;
        public CustomerRepository(StoreContext db) 
        {
            _db = db;
        }


        public async Task AddAsync(Customer entity)
        {
            await _db.Customers.AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Customer>> GetAllAsync()
        {
            var result = await _db.Customers.ToListAsync();
            return result.ToList();

        }

        public async Task<Customer> GetByIdAsync(int id)
        {
           return await _db.Customers.Where(c => c.Id == id).FirstOrDefaultAsync();
        }

      

        public Task UpdateAsync(Customer entity)
        {
            throw new NotImplementedException();
        }
    }
}
