﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PracticalTest.Entities.Entites;

namespace PracticalTest.Repository.Context.Config
{
    public class ProductConfguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(500);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(1000);
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.Property(p => p.PictureUrl).IsRequired();
            builder.Property(p => p.IsAvailable).IsRequired();
            builder.HasOne(b => b.ProductBrand).WithMany()
                .HasForeignKey(t => t.ProductBrandId);
            builder.HasOne(c => c.ProductType).WithMany()
                .HasForeignKey(p => p.ProductTypeId);
        }
    }
}
