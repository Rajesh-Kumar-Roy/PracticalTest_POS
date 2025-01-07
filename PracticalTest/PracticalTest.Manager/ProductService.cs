using AutoMapper;
using PracticalTest.Entities.Entites;
using PracticalTest.Entities.Helper;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;
using PracticalTest.Repository.Contract;

namespace PracticalTest.Manager
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;
        public ProductService(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddAsync(ProductDto entity)
        {
            var product = _mapper.Map<Product>(entity);
            await _repository.AddAsync(product);
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductDto>> GetAllAsync() => _mapper.Map<List<ProductDto>>(await _repository.GetAllAsync());

        public async Task<(List<ProductDto> Product, int TotalCount)> GetAsync(ProductParameters productParams) {
           var result = await _repository.GetAsync(productParams);
           return (_mapper.Map<List<ProductDto>>(result.Product),result.TotalCount);
        }

        public async Task<ProductDto> GetByIdAsync(int id) => _mapper.Map<ProductDto>(await _repository.GetByIdAsync(id));

        public Task UpdateAsync(ProductDto entity)
        {
            throw new NotImplementedException();
        }
    }
}
