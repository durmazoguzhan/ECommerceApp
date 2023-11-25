using Inveon.Services.EmailAPI.Models;
using Inveon.Services.EmailAPI.Models.DTOs;
using Inveon.Services.EmailAPI.Repositories;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using Imagekit.Sdk;

namespace Inveon.Services.EmailAPI.Messaging
{
    public class RabbitMQEmailConsumer : BackgroundService
    {
        private IConnection _connection;
        private IModel _channel;
        private readonly IProductRepository _productRepository;
        private readonly IEmailRepository _emailRepository;
        private readonly ImagekitClient _imagekitClient;

        public RabbitMQEmailConsumer(IProductRepository productRepository, IEmailRepository emailRepository)
        {
            _productRepository = productRepository;
            _emailRepository = emailRepository;
            _imagekitClient = new ImagekitClient("public_FI4i51Dw70yo1VgxF/VLZLNO91U=", "private_FUwTptBiOmYZJ5IEV2iMuXu5EfY=", "https://ik.imagekit.io/inveshop");

            var factory = new ConnectionFactory
            {
                HostName = "localhost",
                UserName = "guest",
                Password = "guest"
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(queue: "emailqueue", false, false, false, arguments: null);

        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (ch, ea) =>
            {
                var content = Encoding.UTF8.GetString(ea.Body.ToArray());
                OrderHeaderDto orderHeaderDto = JsonConvert.DeserializeObject<OrderHeaderDto>(content);
                HandleMessage(orderHeaderDto).GetAwaiter().GetResult();

                _channel.BasicAck(ea.DeliveryTag, false);
            };
            _channel.BasicConsume("emailqueue", false, consumer);

            return Task.CompletedTask;
        }

        private async Task HandleMessage(OrderHeaderDto orderHeaderDto)
        {
            EmailContent emailContent = new()
            {
                Email = orderHeaderDto.Email,
                FirstName = orderHeaderDto.FirstName,
                LastName = orderHeaderDto.LastName,
                OrderId = orderHeaderDto.Id,
                OrderTime = orderHeaderDto.OrderTime,
                CouponCode = orderHeaderDto.CouponCode,
                DiscountTotal = orderHeaderDto.DiscountTotal,
                OrderTotal = orderHeaderDto.OrderTotal,
                ProductDetails = new List<ProductDetail>(),
                LogoImageUrl = _imagekitClient.Url(new Transformation()).Path("/logo.png").Generate(),
                ThanksImageUrl = _imagekitClient.Url(new Transformation()).Path("/thanksforyourorder.png").Generate()
            };

            foreach (var detailList in orderHeaderDto.OrderDetails)
            {
                var product = _productRepository.GetProduct(detailList.ProductId).Result;
                ProductDetail productDetail = new()
                {
                    Name = product.Name,
                    Price = product.SalePrice,
                    Count = detailList.Count,
                    Size = detailList.Size,
                    ImageUrl= _imagekitClient.Url(new Transformation()).Path("/ProductImages/"+ product.Images.Split(',')[0]).Generate()
                };
                emailContent.ProductDetails.Add(productDetail);
            }

            try
            {
                await _emailRepository.SendEmail(emailContent);
            }
            catch (Exception) { throw; }

        }
    }
}
