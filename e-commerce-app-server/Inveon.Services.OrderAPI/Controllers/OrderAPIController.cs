using Inveon.Services.OrderAPI.Models.DTOs;
using Inveon.Services.OrderAPI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.Services.OrderAPI.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderAPIController : ControllerBase
    {
        protected ResponseDto _response;
        private IOrderRepository _orderRepository;

        public OrderAPIController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
            _response = new ResponseDto();
        }

        [HttpGet]
        public async Task<object> Get()
        {
            try
            {
                IEnumerable<OrderDto> orderDtos = await _orderRepository.GetOrders();
                _response.Result = orderDtos;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<object> Get(int id)
        {
            try
            {
                OrderDto orderDto = await _orderRepository.GetOrderById(id);
                _response.Result = orderDto;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpGet]
        [Route("GetByUserId/{userId}")]
        public async Task<object> GetByUserId(string userId)
        {
            try
            {
                IEnumerable<OrderDto> orderDtos = await _orderRepository.GetOrdersByUserId(userId);
                _response.Result = orderDtos;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost]
        public async Task<object> Post([FromBody] OrderDto orderDto)
        {
            try
            {
                OrderDto model = await _orderRepository.CreateUpdateOrder(orderDto);
                _response.Result = model;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPut]
        public async Task<object> Put([FromBody] OrderDto orderDto)
        {
            try
            {
                OrderDto model = await _orderRepository.CreateUpdateOrder(orderDto);
                _response.Result = model;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<object> Delete(int id)
        {
            try
            {
                bool isSuccess = await _orderRepository.DeleteOrder(id);
                _response.Result = isSuccess;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}
