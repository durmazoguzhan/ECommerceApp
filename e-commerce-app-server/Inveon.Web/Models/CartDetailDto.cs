namespace Inveon.Web.Models
{
    public class CartDetailDto
    {
        public int Id { get; set; }
        public int CartHeaderId { get; set; }
        public virtual CartHeaderDto CartHeader { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; }
        public string? Size { get; set; }
    }
}
