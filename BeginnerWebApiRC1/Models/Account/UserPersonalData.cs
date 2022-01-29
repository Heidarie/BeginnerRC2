using System.Runtime.Serialization;

namespace BeginnerWebApiRC1.Models.Account
{
    [DataContract(Name ="person_data", Namespace ="")]
    public partial class UserPersonalData
    {
        [DataMember]
        public string UserAboutMe { get; set; }
        [DataMember]
        public string UserExperience { get; set; }
    }
}
