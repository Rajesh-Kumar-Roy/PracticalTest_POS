using Microsoft.AspNetCore.Mvc;
using PracticalTest.Errors;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticalTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PosController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public PosController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/<PosController>
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> Get()
        {
            return Ok(await _orderService.GetAllAsync());

        }
        // GET api/<PosController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> Get(int id)
        {
            return await _orderService.GetByIdAsync(id);
        }

        //// POST api/<PosController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] OrderDto dto)
        {
            await _orderService.AddAsync(dto);
            return Ok(new ApiResponse(201, "Data Saved"));
        }

        //// POST api/<PosController>
        [HttpPost("SaveWithReturnNew")]
        public async Task<ActionResult> SaveWithReturnNew([FromBody] OrderDto dto)
        {
            return Ok(await _orderService.AddWithReturnNewOrderAsync(dto));
        }

        [HttpGet("GetOderInvoiceData/{orderId}")]
        public async Task<ActionResult<OrderInvoiceDto>> GetOderInvoiceData(int orderId)
        {
            return await _orderService.GetOrderInvoiceDataAsync(orderId);
        }
    }
}
