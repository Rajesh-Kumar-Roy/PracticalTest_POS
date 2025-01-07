using PracticalTest.Entities.Entites;
using System.ComponentModel.DataAnnotations;

namespace PracticalTest.Manager.EntityDtos
{
    public class SaleDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "This field is required.")]
        public DateTime SaleDate { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public ICollection<SaleItemDto> Items { get; set; }
    }

}
