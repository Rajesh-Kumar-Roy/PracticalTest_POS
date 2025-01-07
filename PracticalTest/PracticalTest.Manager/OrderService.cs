using AutoMapper;
using PracticalTest.Entities.Entites;
using PracticalTest.Manager.Contract;
using PracticalTest.Manager.EntityDtos;
using PracticalTest.Repository.Contract;

namespace PracticalTest.Manager
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;
        private readonly IMapper _mapper;
        public OrderService(IOrderRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddAsync(OrderDto entity)
        {
            await _repository.AddAsync(_mapper.Map<Order>(entity));
        }

        public async Task<OrderDto> AddWithReturnNewOrderAsync(OrderDto entity)
        {
            return _mapper.Map<OrderDto>(await _repository.AddWithReturnNewOrderAsync(_mapper.Map<Order>(entity)));
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<OrderDto>> GetAllAsync() => _mapper.Map<List<OrderDto>>(await _repository.GetAllAsync());


        public async Task<OrderDto> GetByIdAsync(int id) => _mapper.Map<OrderDto>(await _repository.GetByIdAsync(id));

        public async Task<OrderInvoiceDto> GetOrderInvoiceDataAsync(int orderId)
        {
           return _mapper.Map<OrderInvoiceDto>(await _repository.GetOrderInvoiceDataAsync(orderId));
        }

        public async Task UpdateAsync(OrderDto entity)
        {
            await _repository.UpdateAsync(_mapper.Map<Order>(entity));
        }
    }
}
