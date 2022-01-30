using BeginnerWebApiRC1.Beginner;
using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Account;
using BeginnerWebApiRC1.Models.Shared;
using BeginnerWebApiRC1.Refactors;
using BeginnerWebApiRC1.Token;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using MimeKit;
using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeginnerWebApiRC1.Controllers
{
    [EnableCors]
    [Route("[controller]")]
    [ApiController]
    public class AccountController : BaseController // always iherit from this controller!
    {
        private readonly UserManager<BeginnerUser> _userManager;
        private readonly SignInManager<BeginnerUser> _signInManager;
        private readonly IRefreshTokenRepository _cachedRefreshTokenRepository;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(UserManager<BeginnerUser> userManager,
            SignInManager<BeginnerUser> signInManager,
            IRefreshTokenRepository cachedRefreshTokenRepository,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _cachedRefreshTokenRepository = cachedRefreshTokenRepository;
            _roleManager = roleManager;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IActionResult> Post([FromForm] RegistrationModel model)
        {

            var user = new BeginnerUser() //Set new user model 
            {
                Name = model.Name,
                Surname = model.Surname,
                Email = model.Email,
                StatusId = 1,
                UserName = model.Username,
                Md = DateTime.Now,
                PhoneNumber = model.PhoneNumber,
                RoleId = (int)model.Role,
                ProfessionId = 1,
                SubscriptionTypeId = 1

            };
            try
            {
                var checkIfUserExist = await _userManager.FindByEmailAsync(user.Email);

                if (checkIfUserExist == null && (user.RoleId == (int)Roles.Employer || user.RoleId == (int)Roles.Employee)) // check if exist any with this email
                {
                    var result = await _userManager.CreateAsync(user, model.Password); // create new user, insert to db

                    try
                    {
                        if (result.Succeeded)
                        {

                            if (await _roleManager.RoleExistsAsync(model.Role.ToString()) == false)
                            {
                                await _roleManager.CreateAsync(new IdentityRole(model.Role.ToString()));
                            }

                            var res = await _userManager.AddToRoleAsync(user, model.Role.ToString());


                            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                            MailFactory.SendConfirmationMail(model, token);

                            var refreshToken = TokenManager.GenerateRefreshToken(user);
                            if (user.RefreshTokens == null)
                                user.RefreshTokens = new System.Collections.Generic.List<string>();
                            user.RefreshTokens.Add(refreshToken.refreshToken); // create jwt bearer refreshToken and assing it to user  


                            return Ok(new TokenModel
                            {
                                AccessToken = TokenManager.GenerateVerificationAccessToken(user, token),
                                RefreshToken = refreshToken.refreshToken,
                            });
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Error(string.Format("UserManager did not create new user. Errors: {0}", result.Errors));
                    }
                    string errors = string.Join(",", result.Errors);
                }

                return Conflict("Istnieje już użytkownik o podanym mailu");
            }
            catch(Exception ex)
            {
                return BadRequest(new
                {
                    error = ex
                });
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] AuthenticationModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var checkPassword = await _userManager.CheckPasswordAsync(user, model.Password);
                    if (checkPassword)
                    {
                        var refreshToken = TokenManager.GenerateRefreshToken(user);

                        RefreshToken refreshTokenDTO = new RefreshToken()
                        {
                            Token = refreshToken.refreshToken,
                            UserId = user.Id
                        };

                        await _cachedRefreshTokenRepository.Create(refreshTokenDTO);

                        if (user.StatusId == 1)
                        {
                            string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                            MailFactory.ResendConfirmationMail(user.Email, user.Name, token);

                            return Ok(new
                            {
                                accessToken = TokenManager.GenerateVerificationAccessToken(user, token),
                                refreshToken = refreshToken.refreshToken,
                                path = "/ConfirmAccount"
                            }); // redirect to confirm account
                        }

                        var identityRole = await _userManager.GetRolesAsync(user);
                        string role = identityRole.FirstOrDefault();
                        if (string.IsNullOrEmpty(role))
                        {
                            role = ((Roles)user.RoleId).ToString();
                        }

                        return Ok(new TokenModel
                        {
                            AccessToken = refreshToken.jwt,
                            RefreshToken = refreshToken.refreshToken,
                            UserRole = role,
                            UserId = user.Id  
                        }); 
                    }
                    return Conflict("Błędne hasło");
                }
                return Conflict("Nie istnieje użytkownik o podanym mailu");
            }
            return BadRequest();
        }

        [EnableCors]
        [HttpGet]
        [Route("ConfirmAccount")]
        [Authorize(AuthenticationSchemes = "verify")]
        public async Task<IActionResult> ConfirmAccount()
        {
            Claim username = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "username");
            Claim verificationCode = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "verificationCode");
            BeginnerUser user = await _userManager.FindByNameAsync(username.Value);
            var result = await _userManager.ConfirmEmailAsync(user, verificationCode.Value);
            if (result.Succeeded)
            {
                user.StatusId = 2;
                bool dbResult = await DatabaseManager.ActivateUser(user.Id, user.StatusId);
                return Ok();
            }
            return ValidationProblem();
        }

        [HttpGet]
        [Route("Logout")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Logout()
        {
            Claim userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId");
            await _cachedRefreshTokenRepository.DeleteAll(userId.Value);
            return Ok();
        }

        [HttpGet]
        [Route("Test")]
        [AllowAnonymous]
        public async Task<BeginnerUser> Test()
        {
            BeginnerUser user = await _userManager.FindByNameAsync("Dawid");
            return user;
        }
    }
}
