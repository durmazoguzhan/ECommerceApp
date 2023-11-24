namespace Inveon.Services.FavoriteAPI.Models.DTOs
{
    public class FavoriteDetailDto
    {
        public int Id { get; set; }
        public int FavoriteHeaderId { get; set; }
        public virtual FavoriteHeaderDto FavoriteHeader { get; set; }
        public int ProductId { get; set; }
    }
}
