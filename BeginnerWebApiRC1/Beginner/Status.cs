﻿using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class Status
    {
        public Status()
        {
            Offers = new HashSet<Offer>();
            People = new HashSet<Person>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Offer> Offers { get; set; }
        public virtual ICollection<Person> People { get; set; }
    }
}
