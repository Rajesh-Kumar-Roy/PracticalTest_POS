using AutoMapper;
using PracticalTest.Entities.Entites;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;
using PracticalTest.Repository.Contract;

namespace PracticalTest.Manager
{
    public class OrderPaymentService : IOrderPaymentService
    {
        private readonly IOrderPaymentRepository _repository;
        private readonly IMapper _mapper;
        public OrderPaymentService(IOrderPaymentRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddAsync(OrderPaymentDto entity)
        {
            await _repository.AddAsync(_mapper.Map<OrderPayment>(entity));
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<OrderPaymentDto>> GetAllAsync() => _mapper.Map<List<OrderPaymentDto>>(await _repository.GetAllAsync());


        public async Task<OrderPaymentDto> GetByIdAsync(int id) => _mapper.Map<OrderPaymentDto>(await _repository.GetByIdAsync(id));

        public async Task UpdateAsync(OrderPaymentDto entity)
        {
            await _repository.UpdateAsync(_mapper.Map<OrderPayment>(entity));
        }
    }
}
