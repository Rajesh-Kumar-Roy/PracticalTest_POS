namespace PracticalTest.Entities.Entites
{
    public class Order : BaseEntity
    {
        public double VatAmount { get; set; }
        public double? DiscountAmount { get; set; } = 0;
        public double? AdjustmentAmount { get; set; } = 0;
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public int CustomerId { get; set; }
        public Customer Customers { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }

    }
}
