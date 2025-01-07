using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PracticalTest.Entities.Entites;

namespace PracticalTest.Repository.Context.Config
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Email).IsRequired().HasMaxLength(50);
            builder.Property(p => p.Phone).IsRequired().HasMaxLength(17);
            builder.Property(p => p.Address).HasMaxLength(500);

        }

    }
}
