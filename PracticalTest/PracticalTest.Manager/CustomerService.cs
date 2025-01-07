using AutoMapper;
using PracticalTest.Entities.Entites;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;
using PracticalTest.Repository.Contract;

namespace PracticalTest.Manager
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repository;
        private readonly IMapper _mapper;
        public CustomerService(ICustomerRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddAsync(CustomerDto entity)
        {
            await _repository.AddAsync(_mapper.Map<Customer>(entity));
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<CustomerDto>> GetAllAsync() => _mapper.Map<List<CustomerDto>>(await _repository.GetAllAsync());

        public async Task<CustomerDto> GetByIdAsync(int id)
        {
            return _mapper.Map<CustomerDto>(await _repository.GetByIdAsync(id));
        }

        public Task UpdateAsync(CustomerDto entity)
        {
            throw new NotImplementedException();
        }
    }
}
