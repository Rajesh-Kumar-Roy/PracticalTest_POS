using Microsoft.AspNetCore.Mvc;
using PracticalTest.Errors;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticalTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        public async Task<ActionResult<List<CustomerDto>>> Get()
        {
            return Ok(await _customerService.GetAllAsync());

        }
        // GET api/<CustomerController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> Get(int id)
        {
            return await _customerService.GetByIdAsync(id);
        }

        //// POST api/<CustomerController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CustomerDto productDto)
        {
            await _customerService.AddAsync(productDto);
            return Ok(new ApiResponse(201, "Data Saved"));
        }
    }
}
