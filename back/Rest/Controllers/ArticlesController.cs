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

            if (filter.PrixMin >= 0 && filter.PrixMax >= 0 && filter.PrixMin <= filter.PrixMax)
            {
                ctx = ctx.Where(a => a.prix >= filter.PrixMin && a.prix <= filter.PrixMax);
            }
            else if (filter.PrixMin >= 0)
            {
                ctx = ctx.Where(a => a.prix >= filter.PrixMin);
            }
            else if (filter.PrixMax >= 0)
            {
                ctx = ctx.Where(a => a.prix <= filter.PrixMax);
            }

            if (filter.Tags != null && filter.Tags.Any())
            {
                ctx = ctx.Where(a => filter.Tags.Any(tag => a.Tags.Any(t => t == tag)));
            }

            if (!string.IsNullOrEmpty(filter.Marque))
            {
                ctx = ctx.Where(a => a.marque.Contains(filter.Marque));
            }

            return ctx.AsEnumerable();
        }

        [HttpGet]
        [Route("api/articles/prix")]
        public IHttpActionResult GetPrix()
        {
            var PrixMin = new ProjetFinalEntities().Articles.Where(a => a.archive == null).Min(a => a.prix);
            var PrixMax = new ProjetFinalEntities().Articles.Where(a => a.archive == null).Max(a => a.prix);

            return Ok(new { PrixMin = PrixMin, PrixMax = PrixMax });
        }
    }
}
