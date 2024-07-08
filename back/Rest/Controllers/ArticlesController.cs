using Rest.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Routing;
using System.Security.Principal;
using Rest.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Rest.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ArticlesController : ApiController
    {
        public IEnumerable<Articles> Get()
        {
            return new ProjetFinalEntities().Articles.Include("TagsPriv").AsEnumerable();
        }

        public Articles Get(int id)
        {
            return new ProjetFinalEntities().Articles.Include("TagsPriv").Where(article => article.id == id).First();
        }
        //public void Post([FromBody]Articles article)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    ctx.Articles.Add(article);
        //    ctx.SaveChanges();
        //}
        //public void Delete(int id)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    var article = ctx.Articles.Find(id);
        //    article.archive = DateTime.Now;
        //    ctx.SaveChanges();
        //}
        //public void Put([FromBody]Articles article)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    ctx.Entry(article).State = System.Data.Entity.EntityState.Modified;
        //    ctx.SaveChanges();
        //}
        [HttpPost]
        [Route("api/articles/search")]
        public IEnumerable<Articles> Search([FromBody] ArticleFilter filter)
        {
            var ctx = new ProjetFinalEntities().Articles.Include("TagsPriv").AsQueryable();

            ctx = ctx.Where(a => a.archive == null);

            if (!string.IsNullOrEmpty(filter.Nom))
            {
                ctx = ctx.Where(a => a.nom.Contains(filter.Nom));
            }

            if (filter.Prix != null && filter.Prix.Length == 2 && filter.Prix[0] >= 0 && filter.Prix[1] >= 0 && filter.Prix[0] <= filter.Prix[1])
            {
                int prixMin = filter.Prix[0];
                int prixMax = filter.Prix[1];
                ctx = ctx.Where(a => a.prix >= prixMin && a.prix <= prixMax);
            }

            if (!string.IsNullOrEmpty(filter.Marque))
            {
                ctx = ctx.Where(a => a.marque.Contains(filter.Marque));
            }

            var result = ctx.AsEnumerable();

            if (filter.Tags != null && filter.Tags.Any())
            {
                result = result.Where(a => a.Tags.Any(t => filter.Tags.Contains(t)));
            }

            return result.OrderBy(a => a.nom);
        }

        [HttpGet]
        [Route("api/articles/prix")]
        public IHttpActionResult GetPrix()
        {
            var PrixMin = new ProjetFinalEntities().Articles.Where(a => a.archive == null).Min(a => a.prix);
            var PrixMax = new ProjetFinalEntities().Articles.Where(a => a.archive == null).Max(a => a.prix);

            int?[] result = { PrixMin, PrixMax };

            return Ok(result);
        }

        [HttpGet]
        [Route("api/protected")]
        public IHttpActionResult GetProtectedData()
        {
            var authHeader = Request.Headers.Authorization;
            if (authHeader == null || authHeader.Scheme != "Bearer")
            {
                return Unauthorized();
            }

            var token = authHeader.Parameter;
            var claimsPrincipal = JwtUtils.ValidateToken(token);

            if (claimsPrincipal == null)
            {
                return Unauthorized();
            }

            var idClaim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == "ClientId")?.Value;
            var emailClaim = claimsPrincipal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            return Ok(new { Email = emailClaim, Id = idClaim, Message = "This is protected data." });
        }
    }
}
