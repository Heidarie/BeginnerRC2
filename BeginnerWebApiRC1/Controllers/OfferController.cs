using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Offer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class OfferController : BaseController
    {
        private readonly IMemoryCache _cache;
        private BeginnerUser user;

        public OfferController(IMemoryCache cache)
        {
            _cache = cache;
            this.SetBeginnerUser(_cache);
        }

        [HttpGet]
        [Route("[Action]")]
        [AllowAnonymous]
        public async Task<List<ShortOfferModel>> GetAllOffers()
        {
            List<ShortOfferModel> shortOfferModels = new List<ShortOfferModel>();
            shortOfferModels = await DatabaseManager.GetAllOffers();
            return shortOfferModels;
        }

        [HttpGet]
        [Route("[action]")]
        [AllowAnonymous]
        public async Task<OfferModel> GetOfferDetails(int offerId)
        {
            OfferModel offer = new OfferModel();
            offer = await DatabaseManager.GetOffer(offerId, LoggedUser);
            return offer;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddOffer(OfferModel offer)
        {
            _cache.TryGetValue("BeginnerUser", out user);
            string benefits = string.Join(";", offer.Benefits);
            string languages = string.Join(";", offer.Languages);
            bool result = await DatabaseManager.CreateOffer(offer, LoggedUser.Id, benefits, languages);
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
        public async Task<IActionResult> EditOffer(OfferModel offer)
        {
            if (ModelState.IsValid)
            {
                _cache.TryGetValue("BeginnerUser", out user);
                string benefits = string.Join(";", offer.Benefits);
                string languages = string.Join(";", offer.Languages);
                bool result = await DatabaseManager.UpdateOffer(offer, LoggedUser.Id, benefits, languages);
                if (result)
                {
                    return Ok("Dodano ofertę");
                }
                else
                {
                    return Problem("Wystąpił problem podczas dodawania oferty");
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> UserApply(int offerId)
        {
            _cache.TryGetValue("BeginnerUser", out user);
            bool result = await DatabaseManager.AssignUserToOffer(LoggedUser.Id, offerId);
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
