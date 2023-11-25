namespace Inveon.Services.EmailAPI.Models
{
    public class EmailContent
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int OrderId { get; set; }
        public DateTime OrderTime { get; set; }
        public string CouponCode { get; set; }
        public double DiscountTotal { get; set; }
        public double OrderTotal { get; set; }
        public List<ProductDetail> ProductDetails { get; set; }
        public string LogoImageUrl { get; set; }
        public string ThanksImageUrl { get; set; }
    }
}
