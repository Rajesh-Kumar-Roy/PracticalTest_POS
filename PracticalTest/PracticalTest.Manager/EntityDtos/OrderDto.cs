using PracticalTest.Entities.Entites;

namespace PracticalTest.Manager.EntityDtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public double VatAmount { get; set; }
        public double? DiscountAmount { get; set; } = 0;
        public double? AdjustmentAmount { get; set; } = 0;
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public int CustomerId { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
    }
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int OrderId { get; set; }

    }
    public class OrderInvoiceDto
    {
        public int Id { get; set; }
        public double VatAmount { get; set; }
        public double? DiscountAmount { get; set; } = 0;
        public double? AdjustmentAmount { get; set; } = 0;
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string CustomerName { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
    }
}
