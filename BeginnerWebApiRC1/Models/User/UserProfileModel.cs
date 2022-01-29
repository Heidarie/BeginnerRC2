using BeginnerWebApiRC1.Beginner;

namespace BeginnerWebApiRC1.Models.User
{
    public class UserProfileModel
    {
        public UserProfileModel() { }
        public UserProfileModel(BeginnerUser user, Profession prof, bool userMain)
        {
            this.Name = user.Name;
            this.Surname = user.Surname;
            this.Email = user.Email;
            this.Profession = prof.Profession1;
            this.CvFile = user.CvFile;
            this.AboutMe = user.PersonData.UserAboutMe;
            this.UserExperience = user.PersonData.UserExperience;
            this.IsUserMainAccount = userMain;
        }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Profession { get; set; }
        public string CvFile { get; set; }
        public string AboutMe { get; set; }
        public string UserExperience { get; set; }
        public bool IsUserMainAccount { get; set; }  
    }
}
