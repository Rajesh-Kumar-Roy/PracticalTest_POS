using Microsoft.EntityFrameworkCore;
using PracticalTest.Entities.Entites;
using PracticalTest.Repository.Context;
using PracticalTest.Repository.Contract;
using System.Data;

namespace PracticalTest.Repository
{
    public class OrderPaymentRepository : IOrderPaymentRepository
    {
        private readonly StoreContext _db;
        public OrderPaymentRepository(StoreContext db)
        {
            _db = db;
        }

        public async Task<List<OrderPayment>> GetAllAsync()
        {
            var result = await _db.OrderPayments.ToListAsync();
            return result.ToList();
        }

        public async Task<OrderPayment> GetByIdAsync(int id)
        {
            var result = _db.OrderPayments.Where(c => c.Id == id);
            return await result.FirstOrDefaultAsync();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task AddAsync(OrderPayment entity)
        {
            await _db.OrderPayments.AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(OrderPayment entity)
        {
            _db.OrderPayments.Attach(entity);
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
        }

    }
}
