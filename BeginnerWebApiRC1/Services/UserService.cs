using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Token;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeginnerWebApiRC1.Services
{
    public class UserService
    {
        
        /*public async Task<TokenModel> Refresh(Claim refreshClaim)
        {
            //BeginnerUser user = await _userManager.FindByNameAsync(userClaim.Value);//Find<User>(x => x.Username == userClaim.Value).FirstOrDefault();

            var token = 

            if (user.RefreshTokens == null)
                user.RefreshTokens = new List<string>();

            string token = user.RefreshTokens.FirstOrDefault(x => x == refreshClaim.Value);

            if (token != null)
            {
                var refreshToken = TokenManager.GenerateRefreshToken(user);

                user.RefreshTokens.Add(refreshToken.refreshToken);

                user.RefreshTokens.Remove(token);

                return new TokenModel
                {
                    AccessToken = TokenManager.GenerateAccessToken(user),
                    RefreshToken = refreshToken.jwt
                };
            }
            else
            {
                throw new System.Exception("Refresh token incorrect");
            }
        }*/
    }
}
