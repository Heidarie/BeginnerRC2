using BeginnerWebApiRC1.Models;
using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class UserRole
    {
        public UserRole()
        {
            People = new HashSet<BeginnerUser>();
        }

        public int Id { get; set; }
        public string Role1 { get; set; }

        public virtual ICollection<BeginnerUser> People { get; set; }
    }
}
