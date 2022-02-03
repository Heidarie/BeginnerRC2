using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Offer;
using BeginnerWebApiRC1.Models.Shared;
using BeginnerWebApiRC1.Models.User;
using BeginnerWebApiRC1.Refactors;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeginnerWebApiRC1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class EmployerController : BaseController
    {
        private readonly IMemoryCache _cache;

        public EmployerController(IMemoryCache cache)
        {
            _cache = cache;
            this.SetBeginnerUser(_cache);
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<List<ShortOfferModel>> GetAllEmployerOffers()
        {
            if (LoggedUser.RoleId == (int)Roles.Employer)
            {
                List<ShortOfferModel> shortOfferModels = new List<ShortOfferModel>();
                shortOfferModels = await DatabaseManager.GetAllOffers(LoggedUser.Id);
                return shortOfferModels;
            }
            return null;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<List<ApplicantShortProfile>> GetOfferApplicants(int offerId) 
        {
            if (LoggedUser.RoleId == (int)Roles.Employer)
            {
                List<ApplicantShortProfile> applicantShortProfiles = new List<ApplicantShortProfile>();
                List<BeginnerUser> employees = await DatabaseManager.GetUserApplications(offerId);
                applicantShortProfiles = employees.Select(x => new ApplicantShortProfile(x)).ToList();
                return applicantShortProfiles;
            }
            return null;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> FinishOffer(int offerId)
        {
            bool result = await DatabaseManager.FinishOffer(offerId);
            if (result)
            {
                List<ShortOfferModel> shortOfferModels = new List<ShortOfferModel>();
                shortOfferModels = await DatabaseManager.GetAllOffers(LoggedUser.Id);
                return Ok(shortOfferModels);
            }
            else
            {
                return Problem("Wystąpił problem podczas wyłączania oferty");
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> RenewOffer(int offerId)
        {
            bool result = await DatabaseManager.RenewOffer(offerId);
            if (result)
            {
                List<ShortOfferModel> shortOfferModels = new List<ShortOfferModel>();
                shortOfferModels = await DatabaseManager.GetAllOffers(LoggedUser.Id);
                return Ok(shortOfferModels);
            }
            else
            {
                return Problem("Wystąpił problem podczas przywracania oferty");
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> ChangeApplicationStatus(int offerId, string userId, int statusId)
        {
            if (LoggedUser.RoleId == (int)Roles.Employer)
            {
                ChangedStatusNotification notification = await DatabaseManager.ChangeApplicationStatus(userId, offerId, statusId);
                if (notification != null)
                {
                    MailFactory.SendStatusChangeNotification(notification);
                    return Ok();
                }
                else
                {
                    return Problem();
                }
            }
            return BadRequest();
        }
    }
}
