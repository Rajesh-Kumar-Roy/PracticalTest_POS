using PracticalTest.Entities.Entites;
using System.ComponentModel.DataAnnotations;

namespace PracticalTest.Manager.EntityDtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "This field is required.")]
        public string Name { get; set; } = string.Empty;
        [Required(ErrorMessage = "This field is required.")]
        public decimal Price { get; set; }
        public string BarNo { get; set; }
        public string GenericName { get; set; }
        public string Description { get; set; }
        public string PictureUrl { get; set; }
        public int ProductTypeId { get; set; }
        public int ProductBrandId { get; set; }
        public bool IsAvailable { get; set; }
    }

}
