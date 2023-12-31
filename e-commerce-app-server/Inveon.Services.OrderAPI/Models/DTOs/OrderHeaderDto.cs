﻿using Inveon.MessageBus;

namespace Inveon.Services.OrderAPI.Models.DTOs
{
    public class OrderHeaderDto : BaseMessage
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string CouponCode { get; set; }
        public double OrderTotal { get; set; }
        public double DiscountTotal { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime PickupDateTime { get; set; }
        public DateTime OrderTime { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string CardNumber { get; set; }
        public string CVV { get; set; }
        public string ExpiryMonth { get; set; }
        public string ExpiryYear { get; set; }
        public int CartTotalItems { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
        public bool PaymentStatus { get; set; }
    }
}
