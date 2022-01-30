using BeginnerWebApiRC1.Models.User;

namespace BeginnerWebApiRC1.Models.Shared
{
    public class VisitorNotification
    {
        public VisitorNotification(UserProfileModel profile)
        {
            Name = profile.Name;
            Surname = profile.Surname;
        }

        public string UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
    }
}
