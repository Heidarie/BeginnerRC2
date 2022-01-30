﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeginnerWebApiRC1.Beginner;
using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Offer;
using BeginnerWebApiRC1.Models.Shared;
using BeginnerWebApiRC1.Models.User;
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

        public async Task<ChangedStatusNotification> ChangeApplicationStatus(string userId,int offerId, int statusId)
        {
            ChangedStatusNotification notification = new ChangedStatusNotification();
            try
            {
                EmployeeApplication employee = dbContext.EmployeeApplications.Where(e => e.OffersId == offerId && e.UserId == userId).First();
                dbContext.EmployeeApplications.Remove(employee);
                await dbContext.SaveChangesAsync();
                employee.ApplicationStatusId = statusId;
                dbContext.EmployeeApplications.Add(employee);
                await dbContext.SaveChangesAsync();
                Offer offer = dbContext.Offers.Where(e => e.Id == offerId).FirstOrDefault();
                BeginnerUser user = dbContext.Users.FirstOrDefault(u => u.Id == userId);
                BeginnerUser employerUser = dbContext.Users.Where(u => u.Id == offer.UserId).FirstOrDefault();
                notification.OfferName = offer.Name;
                notification.Status = statusId;
                notification.Name = employerUser.Name;
                notification.Email = user.Email;
                notification.UserId = employerUser.Id;
                return notification;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                return null;
            }
        }
        

        public async Task<OfferModel> GetOffer(int id, string userId)
        {
            Offer offer = dbContext.Offers.FirstOrDefault(o => o.Id == id);
            if (offer != null)
            {
                BeginnerUser employer = dbContext.Users.Where(p => p.Id == offer.UserId).FirstOrDefault();
                EmployeeApplication application = dbContext.EmployeeApplications.Where(a => a.UserId == userId && a.OffersId == offer.Id).FirstOrDefault();
                Profession profession = dbContext.Professions.Where(p => p.Id == offer.ProfessionId).First();
                OfferModel offerModel = new OfferModel(offer, employer, profession, application == null ? "" : dbContext.ApplicationStatuses.Where(a => a.Id == application.ApplicationStatusId).Select(a => a.Name).FirstOrDefault());
                return offerModel;
            }
            return null;
        }

        public async Task<OfferModel> GetOffer(int id)
        {
            Offer offer = dbContext.Offers.FirstOrDefault(o => o.Id == id);
            if (offer != null)
            {
                BeginnerUser employer = dbContext.Users.Where(p => p.Id == offer.UserId).FirstOrDefault();
                Profession profession = dbContext.Professions.Where(p => p.Id == offer.ProfessionId).First();
                OfferModel offerModel = new OfferModel(offer, employer, profession, "");
                return offerModel;
            }
            return null;
        }

        public async Task<bool> CreateOffer(OfferModel offer, string userId, string benefits, string languages)
        {
            Offer highestIdOffer = dbContext.Offers.OrderByDescending(o => o.Id).FirstOrDefault();
            Profession prof = dbContext.Professions.Where(x => x.Profession1 == offer.Profession).FirstOrDefault();
            if(prof == null)
            {
                this.CreateProfession(offer.Profession);
                prof = dbContext.Professions.Where(x => x.Profession1 == offer.Profession).FirstOrDefault();
            }
            //var people = dbContext.Person.ToList();
            try
            {
                Offer dbOffer = new Offer()
                {
                    Id = highestIdOffer != null ? (highestIdOffer.Id + 1) : 1,
                    Cd = DateTime.Now,
                    Fd = DateOnly.FromDateTime(DateTime.Now.AddDays(14)),
                    Name = offer.OfferName,
                    OfferText = offer.Description,
                    UserId = userId,
                    SalaryFrom = offer.SalaryFrom,
                    SalaryTo = offer.SalaryTo,
                    City = offer.City,
                    Street = offer.Street,
                    ProfessionId = prof.Id,
                    StatusId = 1,
                    CompanySize = offer.CompanySize,
                    ExperienceRequired = offer.Experience,
                    Duties = offer.Duties,
                    JobType = offer.JobType,
                    BeginnerUserId = userId,
                    Profession = prof,
                    Status = dbContext.Statuses.FirstOrDefault(s => s.Id == 1)

                };
                dbOffer.AdditionalData = new OfferAdditionalData();
                dbOffer.AdditionalData.Languages = languages;
                dbOffer.AdditionalData.Benefits = benefits;
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

        public async Task<UserProfileModel> GetUserProfile(string userId, bool isUserProfile)
        {
            BeginnerUser user = dbContext.Users.Where(u => u.Id == userId).FirstOrDefault();
            Profession prof = dbContext.Professions.Where(p => p.Id == user.ProfessionId).First();
            UserProfileModel userModel = new UserProfileModel(user, prof, isUserProfile);
            return userModel;

        } 

        public async Task<bool> EditUserProfile(string userId, UserProfileModel model)
        {
            BeginnerUser user = dbContext.Users.Where(u => u.Id == userId).FirstOrDefault();
            Profession prof = dbContext.Professions.Where(p => p.Profession1 == model.Profession).FirstOrDefault();
            if(prof == null)
            {
                this.CreateProfession(model.Profession);
                prof = dbContext.Professions.Where(p => p.Profession1 == model.Profession).FirstOrDefault();
            }
            user.Name = model.Name;
            user.Surname = model.Surname;
            user.ProfessionId = prof.Id;
            user.CvFile = model.CvFileConverted;
            user.PersonData.UserAboutMe = model.AboutMe;
            user.PersonData.UserExperience = model.UserExperience;
            var result = await dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
           
        }

        private void CreateProfession(string proffesionName)
        {
            Profession profession = new Profession();
            int newId = (dbContext.Professions.OrderByDescending(x => x.Id).Select(k => k.Id).FirstOrDefault()) + 1;
            profession.Id = newId;
            profession.Profession1 = proffesionName;
            dbContext.Professions.Add(profession);
            dbContext.SaveChanges();
        }

        public void Dispose()
        {
            this.dbContext.Dispose();
        }
    }
}

