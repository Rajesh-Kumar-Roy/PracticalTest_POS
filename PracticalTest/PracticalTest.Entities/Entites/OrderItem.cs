﻿namespace PracticalTest.Entities.Entites
{
    public class OrderItem: BaseEntity
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }

    }
}
