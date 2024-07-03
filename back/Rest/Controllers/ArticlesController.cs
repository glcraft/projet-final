using Rest.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Rest.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ArticlesController : ApiController
    {
        public IEnumerable<Articles> Get()
        {
            return new ProjetFinalEntities().Articles.AsEnumerable();
        }
        public Articles Get(int id)
        {
            return new ProjetFinalEntities().Articles.Find(id);
        }
        public void Post([FromBody]Articles article)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Articles.Add(article);
            ctx.SaveChanges();
        }
        public void Delete(int id)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Articles.Remove(ctx.Articles.Find(id));
            ctx.SaveChanges();
        }
        public void Put([FromBody]Articles article)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Entry(article).State = System.Data.Entity.EntityState.Modified;
            ctx.SaveChanges();
        }
    }
}
