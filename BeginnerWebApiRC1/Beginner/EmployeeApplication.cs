using BeginnerWebApiRC1.Models;
using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class EmployeeApplication
    {
        public string UserId { get; set; }
        public int OffersId { get; set; }
        public int ApplicationStatusId { get; set; }

        public virtual ApplicationStatus ApplicationStatus { get; set; }
        public virtual Offer Offers { get; set; }
        public virtual BeginnerUser Person { get; set; }
    }
}
