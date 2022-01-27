using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Account;
using BeginnerWebApiRC1.Services;
using BeginnerWebApiRC1.Token;
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
    public class TokenController : BaseController
    {
        private readonly UserManager<BeginnerUser> _userManager;
        private readonly IRefreshTokenRepository _cachedRefreshTokenRepository;

        public TokenController(UserManager<BeginnerUser> userManager,
            IRefreshTokenRepository cachedRefreshTokenRepository)
        {
            _userManager = userManager;
            _cachedRefreshTokenRepository = cachedRefreshTokenRepository;
        }


        [HttpPut("accesstoken", Name = "access")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest refreshRequest)
        {
            if(refreshRequest == null)
            {
                return NotFound("Refresh token not found"); 
            }
            RefreshToken refreshTokenDTO = await _cachedRefreshTokenRepository.GetByToken(refreshRequest.RefreshToken);
            if(refreshTokenDTO == null)
            {
                return NotFound("Refresh token not found");
            }

            BeginnerUser user = await _userManager.FindByIdAsync(refreshTokenDTO.UserId);

            if (user == null)
            {
                return NotFound(new ErrorMessage("User not found"));
            }
            await _cachedRefreshTokenRepository.Delete(refreshTokenDTO);
            
            var newToken = TokenManager.GenerateRefreshToken(user);
            refreshTokenDTO = new RefreshToken()
            {
                Token = newToken.refreshToken,
                UserId = user.Id
            };

            await _cachedRefreshTokenRepository.Create(refreshTokenDTO);

            return Ok(new TokenModel
            {
                AccessToken = newToken.jwt,
                RefreshToken = newToken.refreshToken
            });

        }
    }
}
