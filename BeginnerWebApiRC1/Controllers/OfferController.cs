using BeginnerWebApiRC1.Models.Offer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class OfferController : BaseController
    {
        [HttpGet]
        [Route("[Action]")]
        public async Task<List<ShortOfferModel>> GetAllOffers()
        {
            List<ShortOfferModel> shortOfferModels = new List<ShortOfferModel>();
            shortOfferModels = await DatabaseManager.GetAllOffers();
            return shortOfferModels;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<OfferModel> GetOfferDetails(int offerId)
        {
            Claim userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId");
            OfferModel offer = await DatabaseManager.GetOffer(offerId, userId.Value);
            return offer;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddOffer(OfferModel offer)
        {
            Claim userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId");
            bool result = await DatabaseManager.CreateOffer(offer, userId.Value);
            if (result)
            {
                return Ok("Dodano ofertę");
            }
            else
            {
                return Problem("Wystąpił problem podczas dodawania oferty");
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> UserApply(int offerId)
        {
            Claim userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId");
            bool result = await DatabaseManager.AssignUserToOffer(userId.Value, offerId);
            if (result)
            {
                return Ok("Zaaplikowano na ofertę!");
            }
            else
            {
                return Problem("Wystąpił błąd podczas aplikowania. Spróbuj ponownie później");
            }
        }
    }
}
