using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeginnerWebApiRC1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : BaseController
    {
        private readonly UserManager<BeginnerUser> _userManager;

        public UserController(UserManager<BeginnerUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<UserProfileModel> GetUserProfile(string userId = "")
        {
            if (ModelState.IsValid)
            {
                if (string.IsNullOrEmpty(userId))
                {
                    Claim userIdClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId");
                    if (userIdClaim != null)
                    {
                        userId = userIdClaim.Value;
                        UserProfileModel profileModel = await DatabaseManager.GetUserProfile(userId, true);
                        return profileModel;
                    }
                    return null;
                }
                else
                {
                    UserProfileModel profileModel = await DatabaseManager.GetUserProfile(userId, false);
                    return profileModel;
                }
            }
            return null;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> EditUserProfile([FromForm] UserProfileModel model) 
        {
            try
            {
                Claim userIdClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId");
                bool result = await DatabaseManager.EditUserProfile(userIdClaim.Value, model);
                if (result)
                    return Ok("Pomyślnie edytowano dane!");
                else
                    return Conflict("Wystąpił błąd podczas edycji profilu!");
            }
            catch(Exception ex)
            {
                Logger.Error(string.Format("Error on user profile edit: {0}",ex));
                return Conflict("Wystąpił błąd podczas edycji profilu!");
            }
        }
    }
}
