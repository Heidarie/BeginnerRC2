using BeginnerWebApiRC1.Beginner;
using BeginnerWebApiRC1.Models;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BeginnerWebApiRC1.Token
{
    public static class TokenManager
    {
        private static readonly string _secret = "pBvkPeRw7hlJs31wrY8ztXL7c2ZUn94JOOXEhJqY67lGEcaBMk-7aesgix4lFGqwZg54-EIz4-XlqSzY4wzNtsdw4pYPuBTZYDtvGda1HKMRj5SyH9yUijbLl7ztJ_PUkS6tirrXEYyTbUiy23fsP17B95zCa-1tWc2j_WxfUgJtpNt_PK_7ldpw1Rjbe5N3319PVKxPh9Gvsduap0e-PwSs0B9s8wAuneZvZ8IvlhDesfwXOBoLQLjp7EaQHdE5mBZdbD5gXTmyduEjmjclJdTYtF7LZs8y6l_RAOT_AHD8_wQ5v1dyLndY_o9P2k7dTw027L3JsSR8FvhHJ-VhxQ";
        public static string GenerateAccessToken(BeginnerUser user)
        {
            return new JwtBuilder().WithAlgorithm(new HMACSHA256Algorithm()).WithSecret(Encoding.ASCII.GetBytes(_secret))
                .AddClaim("exp", DateTimeOffset.UtcNow.AddMinutes(10).ToUnixTimeSeconds())
                .AddClaim("username", user.UserName)
                .AddClaim("role", user.RoleId)
                .AddClaim("status", user.StatusId)
                .AddClaim("userId", user.Id)
                .Issuer("Beginner")
                .Audience("access")
                .Encode();
        }

        public static string GenerateVerificationAccessToken(BeginnerUser user, string token)
        {
            return new JwtBuilder().WithAlgorithm(new HMACSHA256Algorithm()).WithSecret(Encoding.ASCII.GetBytes(_secret))
                .AddClaim("exp", DateTimeOffset.UtcNow.AddMinutes(10).ToUnixTimeSeconds())
                .AddClaim("username", user.UserName)
                .AddClaim("role", user.RoleId)
                .AddClaim("status", user.StatusId)
                .AddClaim("verificationCode", token)
                .Issuer("Beginner")
                .Audience("verify")
                .Encode();
        }

        public static (string refreshToken, string jwt) GenerateRefreshToken(BeginnerUser user)
        {
            var symmetricKey = Encoding.ASCII.GetBytes(_secret);
            var tokenHandler = new JwtSecurityTokenHandler();

            var now = DateTime.UtcNow;

            string refreshToken = new JwtBuilder()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret(_secret)
                .AddClaim("exp", DateTimeOffset.UtcNow.AddHours(5).ToUnixTimeSeconds())
                .Issuer("Beginner")
                .Audience("refresh")
                .Encode();

            string jwt = GenerateAccessToken(user);

            return (refreshToken, jwt);
        }

        public static IDictionary<string, object> VerifyToken(string token)
        {
            return new JwtBuilder()
                 .WithSecret(_secret)
                 .MustVerifySignature()
                 .WithAlgorithm(new HMACSHA256Algorithm())
                 .Decode<IDictionary<string, object>>(token);
        }
    }

    
}
