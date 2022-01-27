using BeginnerWebApiRC1.Models;
using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class Participant
    {
        public Participant()
        {
            Messages = new HashSet<Message>();
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public int Person2Id { get; set; }

        public virtual BeginnerUser Person { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
    }
}
