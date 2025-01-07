using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PracticalTest.Entities.Entites
{
    [Table("Product")]
    public class Product : BaseEntity
    {

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        public decimal Price { get; set; }
        public string BarNo { get; set; }
        public string GenericName { get; set; }
        public string Description { get; set; }
        public string PictureUrl { get; set; }
        public ProductType ProductType { get; set; }
        public int ProductTypeId { get; set; }
        public ProductBrand ProductBrand { get; set; }
        public int ProductBrandId { get; set; }
        public bool IsAvailable { get; set; }


    }
}
