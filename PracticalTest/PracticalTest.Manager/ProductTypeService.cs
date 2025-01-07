using AutoMapper;
using PracticalTest.Entities.Entites;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;
using PracticalTest.Repository.Contract;

namespace PracticalTest.Manager
{
    public class ProductTypeService : IProductTypeService
    {
        private readonly IProductTypeRepository _repository;
        private readonly IMapper _mapper;
        public ProductTypeService(IProductTypeRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddAsync(ProductTypeDto entity)
        {
            var productType = _mapper.Map<ProductType>(entity);
            await _repository.AddAsync(productType);
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductTypeDto>> GetAllAsync() => _mapper.Map<List<ProductTypeDto>>(await _repository.GetAllAsync());


        public async Task<ProductTypeDto> GetByIdAsync(int id) => _mapper.Map<ProductTypeDto>(await _repository.GetByIdAsync(id));

        public Task UpdateAsync(ProductTypeDto entity)
        {
            throw new NotImplementedException();
        }
    }
}
