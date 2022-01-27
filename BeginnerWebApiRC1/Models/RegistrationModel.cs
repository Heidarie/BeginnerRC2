

namespace BeginnerWebApiRC1.Models
{
    public class RegistrationModel
    {
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public Roles Role { get; set; }
        public string Username { get; set; }
        public int Profession { get; set; }
        public string PhoneNumber { get; set; }

    }
}
