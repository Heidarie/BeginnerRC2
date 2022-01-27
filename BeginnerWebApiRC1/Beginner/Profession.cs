using BeginnerWebApiRC1.Models;
using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class Profession
    {
        public Profession()
        {
            Offers = new HashSet<Offer>();
            People = new HashSet<BeginnerUser>();
        }

        public int Id { get; set; }
        public string Profession1 { get; set; }

        public virtual ICollection<Offer> Offers { get; set; }
        public virtual ICollection<BeginnerUser> People { get; set; }
    }
}
