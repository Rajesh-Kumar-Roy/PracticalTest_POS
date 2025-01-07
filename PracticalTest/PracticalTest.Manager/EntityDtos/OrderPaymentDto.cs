using PracticalTest.Entities.Entites;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticalTest.Manager.EntityDtos
{
    public class OrderPaymentDto
    {
        public int Id { get; set; }
        public decimal TotalAmount { get; set; }
        public PaymentMethodStatus PaymentMethodStatus { get; set; } = PaymentMethodStatus.Cash;
        public DateTime PaymentDate { get; set; } = DateTime.Now;
        public string? BankName { get; set; }
        public decimal? TakenAmount { get; set; }
        public decimal? ReturnAmount { get; set; }
        public decimal? PaidAmount { get; set; }
        private decimal? _dueAmount;
        public decimal? DueAmount
        {
            get => _dueAmount;
            set
            {
                if (value == null || value >= 0)
                {
                    _dueAmount = value;
                }
                else
                {
                    throw new ArgumentException("Due amount must be greater than zero.");
                }
            }
        }
        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Paid;
        public int OrderId { get; set; }
    }
}
