using BeginnerWebApiRC1.Beginner;

namespace BeginnerWebApiRC1.Models.Offer
{
    public class OfferModel
    {
        public OfferModel() { }
        public OfferModel(Beginner.Offer offer, BeginnerUser employer, Profession profession,string appStatusName)
        {
            Id = offer.Id;
            OfferName = offer.PostalCode;
            Description = offer.OfferText;
            EmployerName = employer.Name;
            SalaryFrom = offer.SalaryFrom;
            SalaryTo = offer.SalaryTo;
            CreationDate = offer.Cd.ToShortDateString();
            FinishDay = offer.Fd.ToShortDateString();
            ApplicationStatus = appStatusName;
            City = offer.City;
            Street = offer.Street;
            Profession = profession.Profession1;
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
    }
}
