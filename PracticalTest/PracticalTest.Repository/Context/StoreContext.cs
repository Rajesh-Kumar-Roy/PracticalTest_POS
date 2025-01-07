using Microsoft.EntityFrameworkCore;
using PracticalTest.Entities.Entites;
using System.Reflection;

namespace PracticalTest.Repository.Context
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {

        }


        // Define DbSet properties for your entities
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderPayment>  OrderPayments { get; set; }




        // use for migration
        // Add-Migration FirstMigrationStoreContext -Context StoreContext -OutputDir Data/Migrations

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
