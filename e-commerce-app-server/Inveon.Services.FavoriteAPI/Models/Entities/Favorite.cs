namespace Inveon.Services.FavoriteAPI.Models.Entities
{
    public class Favorite
    {
        public FavoriteHeader FavoriteHeader { get; set; }
        public IEnumerable<FavoriteDetail> FavoriteDetails { get; set; }
    }
}
