using Microsoft.AspNetCore.Mvc;
using PracticalTest.Errors;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticalTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderPaymentController : ControllerBase
    {
        private readonly IOrderPaymentService _orderPaymentService;

        public OrderPaymentController(IOrderPaymentService orderPaymentService)
        {
            _orderPaymentService = orderPaymentService;
        }

        // GET: api/<OrderPaymentController>
        [HttpGet]
        public async Task<ActionResult<List<OrderPaymentDto>>> Get()
        {
            return Ok(await _orderPaymentService.GetAllAsync());

        }
        // GET api/<OrderPaymentController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderPaymentDto>> Get(int id)
        {
            return await _orderPaymentService.GetByIdAsync(id);
        }

        //// POST api/<OrderPaymentController>
        [HttpPost]
        public async Task<ActionResult> OrderPaymentt([FromBody] OrderPaymentDto dto)
        {
            await _orderPaymentService.AddAsync(dto);
            return Ok(new ApiResponse(201, "Data Saved"));
        }
    }
}
