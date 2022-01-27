using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class ApplicationStatus
    {
        public ApplicationStatus()
        {
            EmployeeApplications = new HashSet<EmployeeApplication>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<EmployeeApplication> EmployeeApplications { get; set; }
    }
}
