using BeginnerWebApiRC1.Beginner;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
            this.EmployerId = employer.Id;
            this.SalaryFrom = offer.SalaryFrom;
            this.SalaryTo = offer.SalaryTo;
            this.CreationDate = offer.Cd.ToShortDateString();
            this.FinishDate = offer.Fd.ToShortDateString();
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
        [Required(ErrorMessage = "Tytuł nie może być pusty")]
        public string OfferName { get; set; }
        [Required(ErrorMessage = "Opis nie może być pusty. Zachęć przyszłych pracowników")]
        public string Description { get; set; }
        public string EmployerName { get; set; }
        public string SalaryFrom { get; set; }
        public string SalaryTo { get; set; }
        public string CreationDate { get; set; }
        public string Image { get; set; }
        public string EmployerId { get; set; }
        public string FinishDate { get; set; }
        public string ApplicationStatus { get; set; }
        [Required]
        public string City { get; set; }
        public string Street { get; set; }
        [Required(ErrorMessage = "Należy podać profesję")]
        public string Profession { get; set; }
        [Required(ErrorMessage = "Jeżeli pracujesz sam wpisz: 1 :)")]
        public int CompanySize { get; set; }
        [Required(ErrorMessage = "Należy podać wymagane doświadczenie")]
        public string Experience { get; set; }
        [Required(ErrorMessage = "Podaj obowiązki pracownika")]
        public string Duties { get; set; }
        [Required(ErrorMessage = "Wybierz jak pracujecie")]
        public string JobType { get; set; }
        [Required(ErrorMessage = "Podaj jaką wiedzę musi mieć pracownik")]
        public List<string> Languages { get; set; }
        [Required(ErrorMessage = "Co Ty oferujesz")]
        public List<string> Benefits { get; set; }

    }
}
