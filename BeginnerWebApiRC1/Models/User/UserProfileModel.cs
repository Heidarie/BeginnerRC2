using BeginnerWebApiRC1.Beginner;
using BeginnerWebApiRC1.Models.Employee;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

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
            this.AboutMe = user.PersonData.UserAboutMe;
            this.UserExperience = user.PersonData.UserExperience;
            this.IsUserMainAccount = userMain;
            this.CvFileConverted = user.CvFile;
            this.UserType = ((Roles)user.RoleId).ToString();
        }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Profession { get; set; }
        public IFormFile CvFile { get; set; }
        public IFormFile UserPicture { get; set; }
        public string UserPictureConverted { get; set; }
        public string CvFileConverted { get; set; }
        public string AboutMe { get; set; }
        public string UserExperience { get; set; }
        public bool IsUserMainAccount { get; set; }
        public string UserType { get; set; }
        public List<ShortApplicationModel> EmployeeApplications { get; set; }
    }
}
