using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeginnerWebApiRC1.Beginner;
using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Offer;
using log4net;

namespace BeginnerWebApiRC1
{
    public class DatabaseManager : IDisposable
    {
        protected ILog Logger;
        ApplicationDbContext dbContext;

        public DatabaseManager()
        {
            Logger = LogManager.GetLogger(this.GetType());
            dbContext = new ApplicationDbContext();
        }

        public async Task<bool> ActivateUser(string userId, int statusId)
        {
            BeginnerUser person = dbContext.Users.Where(p => p.Id == userId).FirstOrDefault();  
            person.StatusId = statusId;
            var result = await dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<List<ShortOfferModel>> GetAllOffers()
        {
            List<ShortOfferModel> shortOfferModels = new List<ShortOfferModel>();
            List<Offer> offers = dbContext.Offers.ToList();
            foreach(var offer in offers)
            {
                BeginnerUser user = dbContext.Users.Where(p => p.Id == offer.UserId).FirstOrDefault();
                Profession prof = dbContext.Professions.Where(p => p.Id == offer.ProfessionId).First();
                shortOfferModels.Add(new ShortOfferModel(offer, user, prof));
            }
            return shortOfferModels;
        }

        public async Task<List<ShortOfferModel>> GetAllOffers(string userId)
        {
            List<ShortOfferModel> shortOfferModels = new List<ShortOfferModel>();
            List<Offer> offers = dbContext.Offers.Where(o => o.BeginnerUserId == userId).ToList();
            foreach (var offer in offers)
            {
                BeginnerUser user = dbContext.Users.Where(p => p.Id == offer.UserId).FirstOrDefault();
                Profession prof = dbContext.Professions.Where(p => p.Id == offer.ProfessionId).First();
                shortOfferModels.Add(new ShortOfferModel(offer, user, prof));
            }
            return shortOfferModels;
        }

        public async Task<List<BeginnerUser>> GetUserApplications(int offerId)
        {
            List<BeginnerUser> users = new List<BeginnerUser>();
            List<EmployeeApplication> employeeApplications = dbContext.EmployeeApplications.Where(a => a.OffersId == offerId && a.ApplicationStatus.Id == 1).ToList();
            foreach(EmployeeApplication application in employeeApplications)
            {
                BeginnerUser user = dbContext.Users.Where(u => u.Id == application.UserId).FirstOrDefault();
                user.ProfessionId1Navigation = dbContext.Professions.FirstOrDefault(p => p.Id == user.ProfessionId);
                users.Add(user);
            }
            return users;
        }

        public async Task<bool> ChangeApplicationStatus(string userId,int offerId, int statusId)
        {
            try
            {
                EmployeeApplication employee = dbContext.EmployeeApplications.Where(e => e.OffersId == offerId && e.UserId == userId).First();
                dbContext.EmployeeApplications.Remove(employee);
                await dbContext.SaveChangesAsync();
                employee.ApplicationStatusId = statusId;
                dbContext.EmployeeApplications.Add(employee);
                await dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                return false;
            }
        }
        

        public async Task<OfferModel> GetOffer(int id, string userId)
        {
            Offer offer = dbContext.Offers.FirstOrDefault(o => o.Id == id);
            BeginnerUser employer = dbContext.Users.Where(p => p.Id == offer.UserId).FirstOrDefault();
            EmployeeApplication application = dbContext.EmployeeApplications.Where(a => a.UserId == userId && a.OffersId == offer.Id).FirstOrDefault();
            Profession profession = dbContext.Professions.Where(p => p.Id == offer.ProfessionId).First();
            OfferModel offerModel = new OfferModel(offer, employer, profession,application == null ? "brak" : dbContext.ApplicationStatuses.Where(a => a.Id == application.ApplicationStatusId).Select(a => a.Name).FirstOrDefault());
            return offerModel;
        }

        public async Task<bool> CreateOffer(OfferModel offer, string userId)
        {
            Offer highestIdOffer = dbContext.Offers.OrderByDescending(o => o.Id).FirstOrDefault();
            //var people = dbContext.Person.ToList();
            try
            {
                Offer dbOffer = new Offer()
                {
                    Id = highestIdOffer != null ? (highestIdOffer.Id + 1) : 1,
                    Cd = DateTime.Now,
                    Fd = DateOnly.FromDateTime(DateTime.Now.AddDays(14)),
                    PostalCode = offer.OfferName,
                    OfferText = offer.Description,
                    UserId = userId,
                    SalaryFrom = offer.SalaryFrom,
                    SalaryTo = offer.SalaryTo,
                    City = offer.City,
                    Street = offer.Street,
                    ProfessionId = dbContext.Professions.Where(x => x.Profession1 == offer.Profession).Select(o => o.Id).First(),
                    StatusId = 1,
                    BeginnerUserId = userId,
                    Profession = dbContext.Professions.Where(x => x.Profession1 == offer.Profession).FirstOrDefault(),
                    Status = dbContext.Statuses.FirstOrDefault(s => s.Id == 1)

                };
                var result = await dbContext.Offers.AddAsync(dbOffer);
                var test = await dbContext.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                Logger.Error(string.Format("Adding new offer went wrong: {0}",ex));
                return false;
            }
        }

        public async Task<bool> AssignUserToOffer(string userId, int offerId)
        {
            try
            {
                EmployeeApplication employeeApplication = new EmployeeApplication();
                employeeApplication.UserId = userId;
                employeeApplication.OffersId = offerId;
                employeeApplication.ApplicationStatusId = 1;
                await dbContext.EmployeeApplications.AddAsync(employeeApplication);
                await dbContext.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                Logger.Error(string.Format("Assigning user to offer went wrong: {0}", ex));
                return false;
            }
        }

        public void Dispose()
        {
            this.dbContext.Dispose();
        }
    }
}

