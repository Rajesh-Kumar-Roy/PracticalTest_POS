using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PracticalTest.Entities.Entites;

namespace PracticalTest.Repository.Context.Config
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.Property(i => i.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}
