using BeginnerWebApiRC1.Beginner;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Models.Offer
{
    public class ShortOfferModel
    {
        public ShortOfferModel() { }

        public ShortOfferModel(Beginner.Offer offer, BeginnerUser user, Profession profession)
        {
            PositionName = offer.Name;
            EmployerName = user.Name;
            Location = offer.City;
            SalaryFrom = offer.SalaryFrom;
            SalaryTo = offer.SalaryTo;
            CreationDate = offer.Cd.ToShortDateString();
            Id = offer.Id;
            Profession = profession.Profession1;
            Languages = offer.AdditionalData != null ? new List<string>(offer.AdditionalData.Languages.Split(";")) : null;
        }
        public int Id { get; set; }
        public string PositionName { get; set; }
        public string EmployerName { get; set; }
        public string Location { get; set; }
        public string SalaryFrom { get; set; }
        public string SalaryTo { get; set; }
        public string CreationDate { get; set; }
        public string Profession { get; set; }
        public List<string> Languages { get; set; }
    }
}
