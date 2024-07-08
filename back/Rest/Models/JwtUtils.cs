using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;

namespace Rest.Models
{
    public static class JwtUtils
    {
        private static readonly string SecretKey = "aP$3jKl1B9sZ8o5W2vG!7xD6yN@mQ4Rt";
        private static readonly string ValidIssuer = "https://localhost:61306";
        private static readonly string ValidAudience = "https://localhost:61306";

        public static ClaimsPrincipal ValidateToken(string token)
        {
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = ValidIssuer,
                ValidAudience = ValidAudience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey))
            };

            var handler = new JwtSecurityTokenHandler();
            try
            {
                var claimsPrincipal = handler.ValidateToken(token, validationParameters, out var validatedToken);
                return claimsPrincipal;
            }
            catch
            {
                return null;
            }
        }
    }
}