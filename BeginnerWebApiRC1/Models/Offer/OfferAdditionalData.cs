using System.Runtime.Serialization;

namespace BeginnerWebApiRC1.Models.Offer
{
    [DataContract(Name = "additional_data", Namespace = "")]
    public class OfferAdditionalData
    {
        [DataMember]
        public string Languages { get; set; }
        [DataMember]
        public string Benefits { get; set; }
    }
}
