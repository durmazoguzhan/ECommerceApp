using AutoMapper;
using Inveon.Services.ShoppingCartAPI.Models.Dto;
using Inveon.Services.ShoppingCartAPI.Models;
using Inveon.Services.ShoppingCartAPI.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Services.ShoppingCartAPI.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;

        public CartRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<bool> ApplyCoupon(string userId, string couponCode)
        {
            var cartFromDb = await _db.CartHeaders.FirstOrDefaultAsync(u => u.UserId == userId);
            cartFromDb.CouponCode = couponCode;
            _db.CartHeaders.Update(cartFromDb);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RemoveCoupon(string userId)
        {
            var cartFromDb = await _db.CartHeaders.FirstOrDefaultAsync(u => u.UserId == userId);
            cartFromDb.CouponCode = "";
            _db.CartHeaders.Update(cartFromDb);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ClearCart(string userId)
        {
            var cartHeaderFromDb = await _db.CartHeaders.FirstOrDefaultAsync(u => u.UserId == userId);
            if (cartHeaderFromDb != null)
            {
                _db.CartDetails
                    .RemoveRange(_db.CartDetails.Where(u => u.CartHeaderId == cartHeaderFromDb.Id));
                _db.CartHeaders.Remove(cartHeaderFromDb);
                await _db.SaveChangesAsync();
                return true;

            }
            return false;
        }

        public async Task<CartDto> CreateUpdateCart(CartDto cartDto)
        {
            Cart cart = _mapper.Map<Cart>(cartDto);

            var cartHeaderFromDb = await _db.CartHeaders.AsNoTracking()
                .FirstOrDefaultAsync(u => u.UserId == cart.CartHeader.UserId);

            if (cartHeaderFromDb == null)
            {
                _db.CartHeaders.Add(cart.CartHeader);
                await _db.SaveChangesAsync();
                cartHeaderFromDb = await _db.CartHeaders.AsNoTracking()
                .FirstOrDefaultAsync(u => u.UserId == cart.CartHeader.UserId);
            }

            var cartDetailsFromDb = await _db.CartDetails.AsNoTracking().FirstOrDefaultAsync(
                u => u.ProductId == cart.CartDetails.FirstOrDefault().ProductId &&
                u.CartHeaderId == cartHeaderFromDb.Id);

            if (cartDetailsFromDb == null)
            {
                foreach (var cartDetail in cart.CartDetails)
                {
                    cartDetail.CartHeaderId = cartHeaderFromDb.Id;
                    _db.CartDetails.Add(cartDetail);
                }
                await _db.SaveChangesAsync();
            }
            else
            {
                foreach (var cartDetail in cart.CartDetails)
                {
                    cartDetail.CartHeaderId = cartHeaderFromDb.Id;
                    _db.CartDetails.Update(cartDetail);
                }
                await _db.SaveChangesAsync();
            }

            return _mapper.Map<CartDto>(cart);

        }

        public async Task<CartDto> GetCartByUserId(string userId)
        {
            var cart = new Cart();
            cart.CartHeader = await _db.CartHeaders.FirstOrDefaultAsync(u => u.UserId == userId);
            cart.CartDetails = _db.CartDetails
                .Where(u => u.CartHeaderId == cart.CartHeader.Id);

            return _mapper.Map<CartDto>(cart);
        }

        public CartDto GetCartByUserIdNonAsync(string userId)
        {
            Cart cart = new()
            {
                CartHeader = new()
            };

            cart.CartDetails = _db.CartDetails
                .Where(u => u.CartHeaderId == cart.CartHeader.Id).Include(u => u.ProductId);

            return _mapper.Map<CartDto>(cart);
        }

        public async Task<bool> RemoveFromCart(int cartDetailsId)
        {
            try
            {
                CartDetail cartDetails = await _db.CartDetails
                    .FirstOrDefaultAsync(u => u.Id == cartDetailsId);

                int totalCountOfCartItems = _db.CartDetails
                    .Where(u => u.CartHeaderId == cartDetails.CartHeaderId).Count();

                _db.CartDetails.Remove(cartDetails);
                if (totalCountOfCartItems == 1)
                {
                    var cartHeaderToRemove = await _db.CartHeaders
                        .FirstOrDefaultAsync(u => u.Id == cartDetails.CartHeaderId);

                    _db.CartHeaders.Remove(cartHeaderToRemove);
                }
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
