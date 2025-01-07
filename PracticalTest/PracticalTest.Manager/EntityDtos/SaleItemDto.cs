using PracticalTest.Entities.Entites;
using System.ComponentModel.DataAnnotations;

namespace PracticalTest.Manager.EntityDtos
{
    public class SaleItemDto {
        public int Id { get; set; }
        public int ProductId { get; set; }
        [Required(ErrorMessage = "This field is required.")]
        public int Quantity { get; set; }
        [Required(ErrorMessage = "This field is required.")]
        public decimal TotalPrice { get; set; }
    }

}
