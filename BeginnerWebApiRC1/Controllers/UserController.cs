using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Shared;
using BeginnerWebApiRC1.Models.User;
using BeginnerWebApiRC1.Refactors;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public UserController(UserManager<BeginnerUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("[action]")]
        [AllowAnonymous]
        public async Task<UserProfileModel> GetUserProfile(string userId = "")
        {
            if (ModelState.IsValid)
            {
                Claim userIdClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId");
                if (userIdClaim != null && userIdClaim.Value == userId)
                {
                    if (userIdClaim != null)
                    {
                        userId = userIdClaim.Value;
                        UserProfileModel profileModel = await DatabaseManager.GetUserProfile(userId, true);
                        profileModel.UserPictureConverted = ConvertImageToBase64(userId);
                        return profileModel;
                    }
                    return null;
                }
                else
                {
                    UserProfileModel profileModel = await DatabaseManager.GetUserProfile(userId, false);
                    if (userIdClaim != null)
                    {
                        UserProfileModel visitorProfileModel = await DatabaseManager.GetUserProfile(userIdClaim.Value, false);
                        VisitorNotification visitorNotification = new VisitorNotification(visitorProfileModel) 
                        { 
                            UserId = userIdClaim.Value, 
                            Email = profileModel.Email
                        };
                        MailFactory.SendUserVisitNotification(visitorNotification);
                    }
                    profileModel.UserPictureConverted = ConvertImageToBase64(userId);
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
                model.CvFileConverted = ConvertPDF(model.CvFile);
                UploadImage(model.UserPicture, userIdClaim.Value);
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

        private string ConvertPDF(IFormFile file)
        {
            string fileBytes = "";
            if (file.Length > 0)
            {
                using(var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var bytes = ms.ToArray();
                    fileBytes = Convert.ToBase64String(bytes);
                }
            }
            return fileBytes;
        }

        private string ConvertImageToBase64(string path)
        {
            try
            {
                path = Path.Combine("Content/Images/User", path + ".jpg");
                string image = System.Convert.ToBase64String(System.IO.File.ReadAllBytes(path));
                return image;
            }
            catch
            {
                Logger.Info(string.Format("Image not found", path));
                return "";
            }
        }

        private void UploadImage(IFormFile photo, string userId)
        {
            if(photo.Length > 0)
            {
                string fileName = userId + ".jpg";
                string path = Path.Combine("Content/Images/User", fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    photo.CopyTo(stream);
                }
            }
        }
    }
}
