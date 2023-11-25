using Inveon.Services.OrderAPI.Messages;
using Inveon.Services.OrderAPI.Models;
using Inveon.Services.OrderAPI.RabbitMQSender;
using Inveon.Services.OrderAPI.Repository;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Text;
using Newtonsoft.Json;
using Inveon.Services.OrderAPI.Models.DTOs;
using AutoMapper;

namespace Inveon.Services.OrderAPI.Messaging
{
    public class RabbitMQCheckoutConsumer : BackgroundService
    {
        private readonly OrderConsumeRepository _orderConsumeRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private IConnection _connection;
        private IModel _channel;
        private readonly IRabbitMQOrderMessageSender _rabbitMQOrderMessageSender;

        public RabbitMQCheckoutConsumer(OrderConsumeRepository orderConsumeRepository, IProductRepository productRepository, IRabbitMQOrderMessageSender rabbitMQOrderMessageSender,IMapper mapper)
        {
            _orderConsumeRepository = orderConsumeRepository;
            _productRepository = productRepository;
            _rabbitMQOrderMessageSender = rabbitMQOrderMessageSender;
            _mapper = mapper;

            var factory = new ConnectionFactory
            {
                HostName = "localhost",
                UserName = "guest",
                Password = "guest"
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(queue: "checkoutqueue", false, false, false, arguments: null);
        }
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (ch, ea) =>
            {
                var content = Encoding.UTF8.GetString(ea.Body.ToArray());
                CheckoutHeaderDto checkoutHeaderDto = JsonConvert.DeserializeObject<CheckoutHeaderDto>(content);
                HandleMessage(checkoutHeaderDto).GetAwaiter().GetResult();

                _channel.BasicAck(ea.DeliveryTag, false);
            };
            _channel.BasicConsume("checkoutqueue", false, consumer);

            return Task.CompletedTask;
        }

        private async Task HandleMessage(CheckoutHeaderDto checkoutHeaderDto)
        {
            OrderHeader orderHeader = new()
            {
                UserId = checkoutHeaderDto.UserId,
                FirstName = checkoutHeaderDto.FirstName,
                LastName = checkoutHeaderDto.LastName,
                OrderDetails = new List<OrderDetail>(),
                CardNumber = checkoutHeaderDto.CardNumber,
                CouponCode = checkoutHeaderDto.CouponCode,
                CVV = checkoutHeaderDto.CVV,
                DiscountTotal = checkoutHeaderDto.DiscountTotal,
                Email = checkoutHeaderDto.Email,
                ExpiryMonth = checkoutHeaderDto.ExpiryMonth,
                ExpiryYear = checkoutHeaderDto.ExpiryYear,
                OrderTime = DateTime.Now,
                OrderTotal = checkoutHeaderDto.OrderTotal,
                PaymentStatus = false,
                Phone = checkoutHeaderDto.Phone,
                PickupDateTime = checkoutHeaderDto.PickupDateTime
            };

            foreach (var detailList in checkoutHeaderDto.CartDetails)
            {
                var detailProduct = _productRepository.GetProduct(detailList.ProductId).Result;
                OrderDetail orderDetails = new()
                {
                    ProductId = detailList.ProductId,
                    Price = detailProduct.SalePrice,
                    Count = detailList.Count,
                    Size = detailList.Size
                };
                orderHeader.CartTotalItems += detailList.Count;
                orderHeader.OrderDetails.Add(orderDetails);
            }

            await _orderConsumeRepository.AddOrder(orderHeader);
            _rabbitMQOrderMessageSender.SendMessage(_mapper.Map<OrderHeaderDto>(orderHeader), "emailqueue");

            PaymentRequestMessage paymentRequestMessage = new()
            {
                Name = orderHeader.FirstName + " " + orderHeader.LastName,
                CardNumber = orderHeader.CardNumber,
                CVV = orderHeader.CVV,
                ExpiryMonth = orderHeader.ExpiryMonth,
                ExpiryYear = orderHeader.ExpiryYear,
                OrderId = orderHeader.Id,
                OrderTotal = orderHeader.OrderTotal,
                Email = orderHeader.Email
            };

            try
            {
                _rabbitMQOrderMessageSender.SendMessage(paymentRequestMessage, "orderpaymentprocesstopic");
            }
            catch (Exception) { }
        }
    }
}
