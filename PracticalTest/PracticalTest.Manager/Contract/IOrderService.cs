using PracticalTest.Manager.EntityDtos;

namespace PracticalTest.Manager.Contract
{
    public interface IOrderService : IBaseService<OrderDto>
    {
        Task<OrderDto> AddWithReturnNewOrderAsync(OrderDto entity);
        Task<OrderInvoiceDto> GetOrderInvoiceDataAsync(int orderId);
    }
}
