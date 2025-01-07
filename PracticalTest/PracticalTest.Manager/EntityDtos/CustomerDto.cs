using System.ComponentModel.DataAnnotations;

namespace PracticalTest.Manager.EntityDtos
{
    public class CustomerDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="This field is required.")]
        [MaxLength(100,ErrorMessage ="Max length 100")]
        public string Name { get; set; }
        [Required(ErrorMessage = "This field is required.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "This field is required.")]
        public string Phone { get; set; }
        [Required(ErrorMessage = "This field is required.")]
        public string Address { get; set; }
    }
}
