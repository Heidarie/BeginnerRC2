﻿using BeginnerWebApiRC1.Beginner;

namespace BeginnerWebApiRC1.Models.Offer
{
    public class ShortOfferModel
    {
        public ShortOfferModel() { }

        public ShortOfferModel(Beginner.Offer offer, BeginnerUser user, Profession profession)
        {
            PositionName = offer.PostalCode;
            EmployerName = user.UserName;
            Location = offer.City;
            SalaryFrom = offer.SalaryFrom;
            SalaryTo = offer.SalaryTo;
            CreationDate = offer.Cd.ToShortDateString();
            Id = offer.Id;
            Profession = profession.Profession1;
        }
        public int Id { get; set; }
        public string PositionName { get; set; }
        public string EmployerName { get; set; }
        public string Location { get; set; }
        public string SalaryFrom { get; set; }
        public string SalaryTo { get; set; }
        public string CreationDate { get; set; }
        public string Profession { get; set; }
    }
}
