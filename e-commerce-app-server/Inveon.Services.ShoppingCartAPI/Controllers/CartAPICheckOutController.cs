using Inveon.Services.ShoppingCartAPI.Messages;
using Inveon.Services.ShoppingCartAPI.Models.Dto;
using Inveon.Services.ShoppingCartAPI.RabbitMQSender;
using Inveon.Services.ShoppingCartAPI.Repository;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.Services.ShoppingCartAPI.Controllers
{
    [Route("api/cartc")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class CartAPICheckOutController : ControllerBase
    {

        private readonly ICartRepository _cartRepository;
        private readonly ICouponRepository _couponRepository;
        private readonly IProductRepository _productRepository;
        private readonly ResponseDto _response;
        private readonly IRabbitMQCartMessageSender _rabbitMQCartMessageSender;


        public CartAPICheckOutController(ICartRepository cartRepository,
            ICouponRepository couponRepository, IProductRepository productRepository,IRabbitMQCartMessageSender rabbitMQCartMessageSender)
        {
            _cartRepository = cartRepository;
            _couponRepository = couponRepository;
            _productRepository = productRepository;
            _rabbitMQCartMessageSender = rabbitMQCartMessageSender;
            _response = new ResponseDto();
        }

        [HttpPost]
        [Authorize]
        public async Task<object> Checkout([FromBody] CheckoutHeaderDto checkoutHeader)
        {
            try
            {
                CartDto cartDto = await _cartRepository.GetCartByUserId(checkoutHeader.UserId);
                if (cartDto == null)
                {
                    return BadRequest();
                }

                if (!string.IsNullOrEmpty(checkoutHeader.CouponCode))
                {
                    CouponDto coupon = await _couponRepository.GetCoupon(checkoutHeader.CouponCode);
                    if (checkoutHeader.DiscountTotal != coupon.DiscountAmount)
                    {
                        _response.IsSuccess = false;
                        _response.ErrorMessages = new List<string>() { "Coupon Price has changed, please confirm" };
                        _response.DisplayMessage = "Coupon Price has changed, please confirm";
                        return _response;
                    }
                }
                checkoutHeader.OrderTotal = Math.Round(checkoutHeader.OrderTotal, 2);
                checkoutHeader.DiscountTotal = Math.Round(checkoutHeader.DiscountTotal, 2);
                checkoutHeader.CartDetails = cartDto.CartDetails;

                _rabbitMQCartMessageSender.SendMessage(checkoutHeader, "checkoutqueue");
                Payment payment = PaymentProcess(checkoutHeader);
                await _cartRepository.ClearCart(checkoutHeader.UserId);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        public Payment PaymentProcess(CheckoutHeaderDto checkoutHeaderDto)
        {
            var request = new CreatePaymentRequest();
            ConfigurePaymentRequest(ref request);

            request.Price = Math.Round(checkoutHeaderDto.OrderTotal, 2).ToString();
            request.PaidPrice = Math.Round(checkoutHeaderDto.OrderTotal, 2).ToString();
            request.PaymentCard = CreatePaymentCard(checkoutHeaderDto);

            request.BasketId = checkoutHeaderDto.CartHeaderId.ToString();
            request.BasketItems = GetBasketItems(checkoutHeaderDto.CartDetails);

            request.Buyer = CreateBuyer(checkoutHeaderDto);
            request.ShippingAddress = CreateAddress();
            request.BillingAddress = CreateAddress();

            var options = new Options();
            ConfigureOptions(ref options);

            return Payment.Create(request, options);
        }

        public void ConfigurePaymentRequest(ref CreatePaymentRequest request)
        {
            request.Locale = Locale.TR.ToString();
            request.ConversationId = new Random().Next(1111, 9999).ToString();
            request.Currency = Currency.TRY.ToString();
            request.PaymentChannel = PaymentChannel.WEB.ToString();
            request.PaymentGroup = PaymentGroup.PRODUCT.ToString();
            request.Installment = 1;
        }

        public PaymentCard CreatePaymentCard(CheckoutHeaderDto checkoutHeaderDto)
        {
            var paymentCard = new PaymentCard
            {
                CardHolderName = checkoutHeaderDto.CartHeaderId.ToString(),
                CardNumber = checkoutHeaderDto.CardNumber,
                ExpireMonth = checkoutHeaderDto.ExpiryMonth,
                ExpireYear = checkoutHeaderDto.ExpiryYear,
                Cvc = checkoutHeaderDto.CVV,
                RegisterCard = 0,
                CardAlias = "Inveon"
            };

            //paymentCard.CardNumber = "5528790000000008";
            //paymentCard.ExpireMonth = "12";
            //paymentCard.ExpireYear = "2030";
            //paymentCard.Cvc = "123";

            return paymentCard;
        }

        public Buyer CreateBuyer(CheckoutHeaderDto checkoutHeaderDto)
        {
            var buyer = new Buyer
            {
                Id = checkoutHeaderDto.UserId,
                Name = checkoutHeaderDto.FirstName,
                Surname = checkoutHeaderDto.LastName,
                GsmNumber = checkoutHeaderDto.Phone,
                Email = checkoutHeaderDto.Email,
                IdentityNumber = "74300864791",
                LastLoginDate = "2015-10-05 12:43:35",
                RegistrationDate = "2013-04-21 15:12:09",
                RegistrationAddress = "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
                Ip = "85.34.78.112",
                City = "Istanbul",
                Country = "Turkey",
                ZipCode = "34732"
            };
            return buyer;
        }

        public Address CreateAddress()
        {
            var shippingAddress = new Address();
            shippingAddress.ContactName = "Jane Doe";
            shippingAddress.City = "Istanbul";
            shippingAddress.Country = "Turkey";
            shippingAddress.Description = "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1";
            shippingAddress.ZipCode = "34742";
            return shippingAddress;
        }

        public List<BasketItem> GetBasketItems(IEnumerable<CartDetailDto> cartItems)
        {
            var basketItems = new List<BasketItem>();

            foreach (var item in cartItems)
            {
                for (int i = 0; i < item.Count; i++)
                {
                    var product = _productRepository.GetProduct(item.ProductId).Result;
                    basketItems.Add(new BasketItem
                    {
                        Id = item.ProductId.ToString(),
                        Name = product.Name,
                        Category1 = product.CategoryId.ToString(),
                        Price = product.SalePrice.ToString(),
                        ItemType = BasketItemType.PHYSICAL.ToString()
                    });
                }
            }

            return basketItems;
        }

        public void ConfigureOptions(ref Options options)
        {
            // Ibrahim Gokyar
            //options.ApiKey = "sandbox-8zkTEIzQ8rikWsvPkL76V8kAvo4DpYuz";
            //options.SecretKey = "sandbox-56FjiYYrjkAuSqENtt0k8b7Ei03s8X61";

            // Oguzhan Durmaz
            options.ApiKey = "sandbox-HymYosJJ7m1WjDs0JNqEbZSKpOP3U3dn";
            options.SecretKey = "sandbox-twsQWSfR41ctcuvelwrk7eswvYv6kPx6";
            options.BaseUrl = "https://sandbox-api.iyzipay.com";
        }

    }
}
