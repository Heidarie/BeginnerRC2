namespace BeginnerWebApiRC1.Models
{
    public class TokenModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string UserRole { get; set; }
        public string UserId { get; set; }
    }
}
