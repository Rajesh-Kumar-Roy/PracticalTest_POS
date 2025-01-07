using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PracticalTest.Entities.Entites;
using System.Reflection.Emit;

namespace PracticalTest.Repository.Context.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(s => s.Status)
                .HasConversion(

                    o => o.ToString(),
                    o => (OrderStatus)Enum.Parse(typeof(OrderStatus), o)
                    );
            builder.HasMany(o => o.OrderItems)
                    .WithOne(oi => oi.Order)
                    .HasForeignKey(oi => oi.OrderId)
                    .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
