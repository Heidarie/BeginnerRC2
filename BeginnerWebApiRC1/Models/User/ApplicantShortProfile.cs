using BeginnerWebApiRC1.Beginner;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Models.User
{
    public class ApplicantShortProfile
    {
        public ApplicantShortProfile(BeginnerUser user)
        {
            Id = user.Id;
            Name = user.Name;
            Surname = user.Surname;
            Profession = user.ProfessionId1Navigation.Profession1;
            StatusId = GetStatusId(user.EmployeeApplications);
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Profession { get; set; }
        public int StatusId { get; set; }

        private int GetStatusId(ICollection<EmployeeApplication> applications)
        {
            int status = 1;
            foreach (EmployeeApplication application in applications)
            {
                status = application.ApplicationStatusId;
            }
            return status;
        }

    }
}
