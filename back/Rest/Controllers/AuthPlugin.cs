using Rest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;

namespace Rest.Controllers
{
    public class AuthData
    {
        public int Id { get; internal set; }
        public string Email { get; internal set; }
    }
    public class AuthApiController : ApiController
    {
        protected AuthData GetData()
        {
            var authHeader = Request.Headers.Authorization;
            if (authHeader == null || authHeader.Scheme != "Bearer")
                return null;

            var token = authHeader.Parameter;
            var claimsPrincipal = JwtUtils.ValidateToken(token);

            if (claimsPrincipal == null)
                return null;

            var idClaim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == "ClientId")?.Value;
            var emailClaim = claimsPrincipal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            int id;
            if (!int.TryParse(idClaim, out id))
                return null;

            return new AuthData{ Email = emailClaim, Id = id };
        }
    }
}
