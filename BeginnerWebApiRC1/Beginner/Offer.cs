using BeginnerWebApiRC1.Models;
using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class Offer
    {
        public Offer()
        {
            EmployeeApplications = new HashSet<EmployeeApplication>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string OfferText { get; set; }
        public string SalaryFrom { get; set; }
        public string SalaryTo { get; set; }
        public DateTime Cd { get; set; }
        public DateTime Md { get; set; }
        public DateOnly Fd { get; set; }
        public string UserId { get; set; }
        public int ProfessionId { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Street { get; set; }
        public int StatusId { get; set; }
        public string Lng { get; set; }
        public string Lat { get; set; }
        public string BeginnerUserId { get; set; }

        public virtual BeginnerUser Person { get; set; }
        public virtual Profession Profession { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<EmployeeApplication> EmployeeApplications { get; set; }
    }
}
