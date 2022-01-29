using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Offer;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class Offer
    {
        public Offer()
        {
            EmployeeApplications = new HashSet<EmployeeApplication>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string OfferText { get; set; }
        public string SalaryFrom { get; set; }
        public string SalaryTo { get; set; }
        public DateTime Cd { get; set; }
        public DateTime Md { get; set; }
        public DateOnly Fd { get; set; }
        public string UserId { get; set; }
        public int ProfessionId { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Street { get; set; }
        public int StatusId { get; set; }
        public string Lng { get; set; }
        public string Lat { get; set; }
        public string BeginnerUserId { get; set; }
        public int CompanySize { get; set; }
        public string ExperienceRequired { get; set; }
        public string Duties { get; set; }
        public string JobType { get; set; }
        [NotMapped]
        public OfferAdditionalData AdditionalData { get; set; }
        public string AdditionalDataSerialized
        {
            get
            {
                string result = null;
                System.Runtime.Serialization.DataContractSerializer ser = new System.Runtime.Serialization.DataContractSerializer(typeof(OfferAdditionalData));
                try
                {
                    using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
                    {
                        ser.WriteObject(ms, AdditionalData);
                        ms.Seek(0, System.IO.SeekOrigin.Begin);
                        using (var sr = new System.IO.StreamReader(ms))
                        {
                            result = sr.ReadToEnd();
                        }
                    }
                }
                catch (Exception ex)
                {

                }
                return result;
            }
            set
            {
                if (string.IsNullOrEmpty(value)) return;
                try
                {

                    System.Runtime.Serialization.DataContractSerializer ser = new System.Runtime.Serialization.DataContractSerializer(typeof(OfferAdditionalData));
                    using (System.IO.MemoryStream ms = new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(value)))
                    {
                        AdditionalData = (OfferAdditionalData)ser.ReadObject(ms);
                    }
                }
                catch (Exception ex)
                {
                    //log
                }

                if (AdditionalData == null)
                    AdditionalData = new OfferAdditionalData();
            }
        }

        public virtual BeginnerUser Person { get; set; }
        public virtual Profession Profession { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<EmployeeApplication> EmployeeApplications { get; set; }
    }
}
