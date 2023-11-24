namespace Inveon.Services.FavoriteAPI.Models.DTOs
{
    public class FavoriteDto
    {
        public FavoriteHeaderDto FavoriteHeader { get; set; }
        public IEnumerable<FavoriteDetailDto> FavoriteDetails { get; set; }
    }
}
