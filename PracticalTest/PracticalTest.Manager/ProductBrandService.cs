using AutoMapper;
using PracticalTest.Entities.Entites;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;
using PracticalTest.Repository.Contract;

namespace PracticalTest.Manager
{
    public class ProductBrandService : IProductBrandService
    {
        private readonly IProductBrandRepository _repository;
        private readonly IMapper _mapper;
        public ProductBrandService(IProductBrandRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddAsync(ProductBrandDto entity)
        {
            var product = _mapper.Map<ProductBrand>(entity);
            await _repository.AddAsync(product);
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductBrandDto>> GetAllAsync() => _mapper.Map<List<ProductBrandDto>>(await _repository.GetAllAsync());


        public async Task<ProductBrandDto> GetByIdAsync(int id) => _mapper.Map<ProductBrandDto>(await _repository.GetByIdAsync(id));

        public Task UpdateAsync(ProductBrandDto entity)
        {
            throw new NotImplementedException();
        }
    }
}
