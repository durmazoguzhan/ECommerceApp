using Inveon.Web.Hubs;
using Inveon.Web.Models;
using Inveon.Web.Services.IServices;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Diagnostics;

namespace Inveon.Web.Areas.Customer.Controllers
{
    [Area("Customer")]
    public class CustomerController : Controller
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly IProductService _productService;
        private readonly ICartService _cartService;
        private readonly IHubContext<MessageHub> _messageHub;

        public CustomerController(ILogger<CustomerController> logger, IProductService productService, IHubContext<MessageHub> messageHub, ICartService cartService)
        {
            _logger = logger;
            _productService = productService;
            _messageHub = messageHub;
            _cartService = cartService;
        }

        public async Task<IActionResult> Index()
        {
            List<ProductDto> list = new();
            var response = await _productService.GetAllProductsAsync<ResponseDto>("");
            if (response != null && response.IsSuccess)
            {
                list = JsonConvert.DeserializeObject<List<ProductDto>>(Convert.ToString(response.Result));
            }
            return View(list);
        }

        [Authorize]
        public async Task<IActionResult> Details(int productId)
        {
            var model = new ProductDto();
            var response = await _productService.GetProductByIdAsync<ResponseDto>(productId, "");
            if (response != null && response.IsSuccess)
            {
                model = JsonConvert.DeserializeObject<ProductDto>(Convert.ToString(response.Result));
            }
            return View(model);
        }

        [HttpPost]
        [Authorize]
        [ActionName("Details")]
        public async Task<IActionResult> DetailsPost(ProductDto productDto)
        {
            var UserId = User.Claims.Where(u => u.Type == "sub")?.FirstOrDefault()?.Value;

            var cartHeaderDto = new CartHeaderDto();
            cartHeaderDto.UserId = UserId;

            var cartDto = new CartDto();
            cartDto.CartHeader = cartHeaderDto;

            var cartDetail = new CartDetailDto()
            {
                ProductId = productDto.Id,
                Count = productDto.Count,
                Size = productDto.Size
            };

            var cartDetailsDtos = new List<CartDetailDto>();
            cartDetailsDtos.Add(cartDetail);
            cartDto.CartDetails = cartDetailsDtos;

            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var addToCartResp = await _cartService.AddToCartAsync<ResponseDto>(cartDto, accessToken);

            if (addToCartResp != null && addToCartResp.IsSuccess)
            {
                return RedirectToAction("CartIndex", "Cart");
            }

            return RedirectToAction("Index");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [Authorize]
        public async Task<IActionResult> Login()
        {
            var role = User.Claims.Where(u => u.Type == "role")?.FirstOrDefault()?.Value;
            if (role == "Admin")
            {
                // return Redirect("~/Admin/Admin");
                return RedirectToAction("Git", "Admin", new { area = "Admin" });
            }
            //buradan IdentityServer daki login sayfasına gidiliyor.
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Logout()
        {
            return SignOut("Cookies", "oidc");
        }

        [Route("Message")]
        [HttpPost]
        public IActionResult Message([FromBody] Message message)
        {
            _messageHub.Clients.All.SendAsync("lastMessage", message);
            return Accepted();
        }

        [Route("Partial")]
        [HttpPost]
        public ActionResult DisplayNewMessageBox([FromBody] Message message)
        {
            return PartialView("_MessageBoxPartial", message);
        }
    }
}