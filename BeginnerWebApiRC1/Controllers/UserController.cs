using BeginnerWebApiRC1.Helpers;
using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Shared;
using BeginnerWebApiRC1.Models.User;
using BeginnerWebApiRC1.Refactors;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.IO;
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
        private readonly IMemoryCache _cache;

        public UserController(UserManager<BeginnerUser> userManager, IMemoryCache cache)
        {
            _userManager = userManager;
            _cache = cache;
        }

        [HttpGet]
        [Route("[action]")]
        [AllowAnonymous]
        public async Task<UserProfileModel> GetUserProfile(string userId = "")
        {
            BeginnerUser user = new BeginnerUser();
            _cache.TryGetValue("BeginnerUser", out user);
            if (user != null && user.Id == userId)
            {
                UserProfileModel profileModel = new UserProfileModel();
                if (!_cache.TryGetValue("UserProfile", out profileModel))
                {
                    profileModel = new UserProfileModel(user, user.ProfessionId1Navigation, true);
                    profileModel.UserPictureConverted = FileHelper.ConvertImageToBase64(user.Id);
                    profileModel.EmployeeApplications = await DatabaseManager.GetShortApplicationModel(user);
                    foreach (var application in profileModel.EmployeeApplications)
                    {
                        application.EmployerImage = FileHelper.ConvertImageToBase64(application.EmployerId);
                    }
                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                                            .SetSlidingExpiration(TimeSpan.FromMinutes(10));
                    _cache.Set("UserProfile", profileModel, cacheEntryOptions);
                }
                return profileModel;
            }
            else
            {
                UserProfileModel profileModel = await DatabaseManager.GetUserProfile(userId, false);
                if (user != null)
                {
                    UserProfileModel visitorProfileModel = new UserProfileModel(user, user.ProfessionId1Navigation, true);
                    VisitorNotification visitorNotification = new VisitorNotification(visitorProfileModel)
                    {
                        UserId = user.Id,
                        Email = profileModel.Email
                    };
                    MailFactory.SendUserVisitNotification(visitorNotification);
                }
                profileModel.UserPictureConverted = FileHelper.ConvertImageToBase64(userId);
                return profileModel;
            }


        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> EditUserProfile([FromForm] UserProfileModel model) 
        {
            try
            {
                Claim userIdClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId");
                model.CvFileConverted = FileHelper.ConvertPDF(model.CvFile);
                FileHelper.UploadImage(model.UserPicture, userIdClaim.Value);
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
