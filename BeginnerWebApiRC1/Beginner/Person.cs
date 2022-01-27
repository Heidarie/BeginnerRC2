using BeginnerWebApiRC1.Models.Account;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class Person
    {
        public Person()
        {
            EmployeeApplications = new HashSet<EmployeeApplication>();
            Messages = new HashSet<Message>();
            Offers = new HashSet<Offer>();
            Participants = new HashSet<Participant>();
        }
        public string Id { get; set; }
        public string Email { get; set; }
        public int ProfessionId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Cd { get; set; }
        public DateTime Md { get; set; }
        public string CvFile { get; set; }
        public int RolesId { get; set; }
        public int SubscriptionTypesId { get; set; }
        public string PersonData { get; set; }
        public string Password { get; set; }
        public int? Status { get; set; }
        public int StatusId { get; set; }
        public virtual Profession ProfessionId1Navigation { get; set; }
        public virtual UserRole Roles { get; set; }
        public virtual Status StatusNavigation { get; set; }
        public virtual SubscriptionType SubscriptionTypes { get; set; }
        public virtual ICollection<EmployeeApplication> EmployeeApplications { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<Offer> Offers { get; set; }
        public virtual ICollection<Participant> Participants { get; set; }
    }
}
