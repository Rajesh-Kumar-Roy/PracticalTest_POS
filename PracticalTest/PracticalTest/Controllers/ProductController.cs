using Microsoft.AspNetCore.Mvc;
using PracticalTest.Entities.Helper;
using PracticalTest.Errors;
using PracticalTest.Helper;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticalTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IProductTypeService _productTypeService;
        private readonly IProductBrandService _productBrandService;

        public ProductController(IProductService productService, IProductTypeService productTypeService, IProductBrandService productBrandService)
        {
            _productService = productService;
            _productTypeService = productTypeService;
            _productBrandService = productBrandService;
        }

        // GET: api/<ProductController>
        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> Get([FromQuery] ProductParameters productParams)
        {
            var result = await _productService.GetAsync(productParams);
            return Ok(new Pagination<ProductDto>(productParams.PageNumber, productParams.PageSize, result.TotalCount, result.Product));
           
        }

        [HttpGet("GetAllBrands")]
        public async Task<ActionResult<List<ProductBrandDto>>> GetAllBrands()
        {
            return Ok(await _productBrandService.GetAllAsync());
        }
        [HttpGet("GetAllTypes")]
        public async Task<ActionResult<List<ProductTypeDto>>> GetAllTypes()
        {
            return Ok(await _productTypeService.GetAllAsync());
        }
        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> Get(int id)
        {
            return await _productService.GetByIdAsync(id);
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProductDto productDto)
        {
            await _productService.AddAsync(productDto);
            return Ok(new ApiResponse(201, "Data Saved"));
        }
    }
}
