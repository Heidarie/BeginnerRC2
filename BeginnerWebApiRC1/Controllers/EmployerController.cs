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
        [HttpGet]
        [Route("[action]")]
        public async Task<List<ShortOfferModel>> GetAllEmployerOffers()
        {
            List<ShortOfferModel> shortOfferModels = new List<ShortOfferModel>();  
            Claim userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId");
            shortOfferModels = await DatabaseManager.GetAllOffers(userId.Value);
            return shortOfferModels;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<List<ApplicantShortProfile>> GetOfferApplicants(int offerId) 
        {
            List<ApplicantShortProfile> applicantShortProfiles = new List<ApplicantShortProfile>();
            List<BeginnerUser> employees = await DatabaseManager.GetUserApplications(offerId);
            applicantShortProfiles = employees.Select(x => new ApplicantShortProfile(x)).ToList();
            return applicantShortProfiles;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> ChangeApplicationStatus(int offerId, string userId, int statusId)
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
    }
}
