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
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Profession { get; set; }

    }
}
