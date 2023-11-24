using Inveon.Services.OrderAPI.Models;

namespace Inveon.Services.OrderAPI.Repository
{
    public interface IOrderConsumeRepository
    {
        Task<bool> AddOrder(OrderHeader orderHeader);
        Task UpdateOrderPaymentStatus(int orderHeaderId, bool paid);
    }
}
