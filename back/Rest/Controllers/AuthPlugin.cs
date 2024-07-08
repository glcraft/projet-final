using Rest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
                throw new HttpResponseException(HttpStatusCode.Unauthorized);

            var token = authHeader.Parameter;
            var claimsPrincipal = JwtUtils.ValidateToken(token);

            if (claimsPrincipal == null)
                throw new HttpResponseException(HttpStatusCode.Unauthorized);

            var idClaim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == "ClientId")?.Value;
            var emailClaim = claimsPrincipal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            int id;
            if (!int.TryParse(idClaim, out id))
                throw new HttpResponseException(HttpStatusCode.Unauthorized);

            return new AuthData{ Email = emailClaim, Id = id };
        }
        protected AuthData TryGetData()
        {
            try
            {
                return GetData();
            } catch (HttpResponseException exc)
            {
                if (exc.Response.StatusCode == HttpStatusCode.Unauthorized)
                    return null;
                throw exc;
            }
        }
    }
}
