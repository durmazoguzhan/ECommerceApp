using Inveon.Services.OrderAPI.Models.DTOs;

namespace Inveon.Services.OrderAPI.Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<OrderDto>> GetOrders();
        Task<IEnumerable<OrderDto>> GetOrdersByUserId(string userId);
        Task<OrderDto> GetOrderById(int orderId);
        Task<OrderDto> CreateUpdateOrder(OrderDto orderDto);
        Task<bool> DeleteOrder(int orderId);
    }
}
