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
            this.SetBeginnerUser(_cache);
        }

        [HttpGet]
        [Route("[action]")]
        [AllowAnonymous]
        public async Task<UserProfileModel> GetUserProfile(string userId = "")
        {
            if (LoggedUser != null && LoggedUser.Id == userId)
            {
                UserProfileModel profileModel = new UserProfileModel();
                if (!_cache.TryGetValue("UserProfile", out profileModel))
                {
                    profileModel = new UserProfileModel(LoggedUser, LoggedUser.ProfessionId1Navigation, true);
                    profileModel.UserPictureConverted = FileHelper.ConvertImageToBase64(LoggedUser.Id);
                    if (LoggedUser.RoleId == (int)Roles.Employee)
                    {
                        profileModel.EmployeeApplications = await DatabaseManager.GetShortApplicationModel(LoggedUser);
                        foreach (var application in profileModel.EmployeeApplications)
                        {
                            application.EmployerImage = FileHelper.ConvertImageToBase64(application.EmployerId);
                        }
                    }

                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                                            .SetSlidingExpiration(TimeSpan.FromMinutes(10));
                    _cache.Set("UserProfile", profileModel, cacheEntryOptions);
                }
                return profileModel;
            }
            else
            {
                if (!string.IsNullOrEmpty(userId))
                {
                    try
                    {
                        UserProfileModel profileModel = await DatabaseManager.GetUserProfile(userId, false);
                        if (LoggedUser != null)
                        {
                            UserProfileModel visitorProfileModel = new UserProfileModel(LoggedUser, LoggedUser.ProfessionId1Navigation, true);
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
                    catch (Exception ex)
                    {
                        Logger.Fatal(string.Format("An error on fetching user info. User id: {0}! {1}", userId, ex));
                        return null;
                    }
                }
                return null;
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
