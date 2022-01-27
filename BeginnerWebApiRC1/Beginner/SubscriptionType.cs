using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class SubscriptionType
    {
        public SubscriptionType()
        {
            People = new HashSet<Person>();
        }

        public int Id { get; set; }
        public string Subscription { get; set; }

        public virtual ICollection<Person> People { get; set; }
    }
}
