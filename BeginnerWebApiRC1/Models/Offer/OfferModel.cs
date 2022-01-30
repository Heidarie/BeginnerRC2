using BeginnerWebApiRC1.Beginner;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Models.Offer
{
    public class OfferModel
    {
        public OfferModel() { }
        public OfferModel(Beginner.Offer offer, BeginnerUser employer, Profession profession,string appStatusName)
        {
            this.Id = offer.Id;
            this.OfferName = offer.Name;
            this.Description = offer.OfferText;
            this.EmployerName = employer.Name;
            this.SalaryFrom = offer.SalaryFrom;
            this.SalaryTo = offer.SalaryTo;
            this.CreationDate = offer.Cd.ToShortDateString();
            this.FinishDay = offer.Fd.ToShortDateString();
            this.ApplicationStatus = appStatusName;
            this.City = offer.City;
            this.Street = offer.Street;
            this.Profession = profession.Profession1;
            this.CompanySize = offer.CompanySize;
            this.JobType = offer.JobType;
            this.Experience = offer.ExperienceRequired;
            this.Duties = offer.Duties;
            this.Languages = offer.AdditionalData != null ? new List<string>(offer.AdditionalData.Languages.Split(";")) : null;
            this.Benefits = offer.AdditionalData != null ? new List<string>(offer.AdditionalData.Benefits.Split(";")): null;
        }

        public int? Id { get; set; }
        public string OfferName { get; set; } // use postal code
        public string Description { get; set; }
        public string EmployerName { get; set; }
        public string SalaryFrom { get; set; }
        public string SalaryTo { get; set; }
        public string CreationDate { get; set; }
        public string FinishDay { get; set; }
        public string ApplicationStatus { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Profession { get; set; }
        public int CompanySize { get; set; }
        public string Experience { get; set; }
        public string Duties { get; set; }
        public string JobType { get; set; }
        public List<string> Languages { get; set; }
        public List<string> Benefits { get; set; }

    }
}
