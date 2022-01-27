using BeginnerWebApiRC1.Models;
using System;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class Message
    {
        public int Id { get; set; }
        public string Message1 { get; set; }
        public sbyte? Seen { get; set; }
        public DateTime? Cd { get; set; }
        public int ParticipantsId { get; set; }
        public string SenderId { get; set; }

        public virtual Participant Participants { get; set; }
        public virtual BeginnerUser Sender { get; set; }
    }
}
