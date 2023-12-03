using AutoMapper;
using Inveon.Services.OrderAPI.DbContexts;
using Inveon.Services.OrderAPI.Models;
using Inveon.Services.OrderAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Services.OrderAPI.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;

        public OrderRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        async Task<OrderDto> IOrderRepository.CreateUpdateOrder(OrderDto orderDto)
        {
            OrderHeader order = _mapper.Map<OrderDto, OrderHeader>(orderDto);
            if (order.Id > 0)
                _db.OrderHeaders.Update(order);
            else
                _db.OrderHeaders.Add(order);
            await _db.SaveChangesAsync();
            return _mapper.Map<OrderHeader, OrderDto>(order);
        }

        async Task<bool> IOrderRepository.DeleteOrder(int orderId)
        {
            try
            {
                OrderHeader order = await _db.OrderHeaders.FirstOrDefaultAsync(u => u.Id == orderId);
                if (order == null)
                    return false;
                else
                {
                    _db.OrderHeaders.Remove(order);
                    await _db.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception) { return false; }
        }

        async Task<OrderDto> IOrderRepository.GetOrderById(int orderId)
        {
            OrderHeader order = await _db.OrderHeaders.Where(x => x.Id == orderId).FirstOrDefaultAsync();
            return _mapper.Map<OrderDto>(order);
        }

        async Task<IEnumerable<OrderDto>> IOrderRepository.GetOrders()
        {
            List<OrderHeader> orderList = await _db.OrderHeaders.ToListAsync();
            return _mapper.Map<List<OrderDto>>(orderList);
        }

        async Task<IEnumerable<OrderDto>> IOrderRepository.GetOrdersByUserId(string userId)
        {
            List<OrderHeader> orderList = await _db.OrderHeaders.Where(header=>header.UserId== userId).ToListAsync();
            return _mapper.Map<List<OrderDto>>(orderList);
        }
    }
}
