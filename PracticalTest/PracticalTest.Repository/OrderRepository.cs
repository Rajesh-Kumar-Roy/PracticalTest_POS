using Microsoft.EntityFrameworkCore;
using PracticalTest.Entities.Entites;
using PracticalTest.Repository.Context;
using PracticalTest.Repository.Contract;
using System.Data;

namespace PracticalTest.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly StoreContext _db;
        public OrderRepository(StoreContext db)
        {
            _db = db;
        }

        public async Task<List<Order>> GetAllAsync()
        {
            var result = await _db.Orders.Include(c=>c.OrderItems).ToListAsync();
            return result.ToList();
        }

        public async Task<Order> GetByIdAsync(int id)
        {
            var result = _db.Orders.Include(c=>c.OrderItems).Where(c => c.Id == id);
            return await result.FirstOrDefaultAsync() ?? new Order();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task AddAsync(Order entity)
        {
            await _db.Orders.AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Order entity)
        {
            _db.Orders.Attach(entity);
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
        }

        public async Task<Order> AddWithReturnNewOrderAsync(Order entity)
        {
            await _db.Orders.AddAsync(entity);
            await _db.SaveChangesAsync();
            return entity;
        }

        public async Task<Order> GetOrderInvoiceDataAsync(int orderId)
        {
            return await _db.Orders
            .Where(c => c.Id == orderId)
            .Include(i => i.OrderItems)
            .Include(d => d.Customers)
            .FirstOrDefaultAsync() ?? new Order();
        }
    }
}
