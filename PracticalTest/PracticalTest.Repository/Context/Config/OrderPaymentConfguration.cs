using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PracticalTest.Entities.Entites;

namespace PracticalTest.Repository.Context.Config
{
    public class OrderPaymentConfguration : IEntityTypeConfiguration<OrderPayment>
    {
        public void Configure(EntityTypeBuilder<OrderPayment> builder)
        {
            builder.Property(p => p.Id).IsRequired();
  
            builder.Property(p => p.BankName).HasMaxLength(150);
            builder.Property(p => p.TakenAmount).HasColumnType("decimal(18,2)");
            builder.Property(p => p.ReturnAmount).HasColumnType("decimal(18,2)");
            builder.Property(p => p.PaidAmount).HasColumnType("decimal(18,2)");
            builder.Property(p => p.DueAmount).HasColumnType("decimal(18,2)");
            builder.Property(s => s.PaymentStatus)
                .HasConversion(o => o.ToString(), o => (PaymentStatus)Enum.Parse(typeof(PaymentStatus), o)).HasMaxLength(100);
            builder.Property(s => s.PaymentMethodStatus)
                .HasConversion( o => o.ToString(),o => (PaymentMethodStatus)Enum.Parse(typeof(PaymentMethodStatus), o)).HasMaxLength(100);

            builder.HasOne(b => b.Order).WithMany()
                .HasForeignKey(t => t.OrderId);

        }
    }
}
