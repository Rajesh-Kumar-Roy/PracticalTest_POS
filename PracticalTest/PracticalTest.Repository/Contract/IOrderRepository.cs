
using PracticalTest.Entities.Entites;

namespace PracticalTest.Repository.Contract
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        Task<Order> AddWithReturnNewOrderAsync(Order entity);
        Task<Order> GetOrderInvoiceDataAsync(int orderId);
    }
}
