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
    public class PaniersController : ApiController
    {
        public IEnumerable<Paniers> Get()
        {
            return new ProjetFinalEntities().Paniers.AsEnumerable();
        }
        public Paniers Get(int id)
        {
            return new ProjetFinalEntities().Paniers.Find(id);
        }
        public void Post([FromBody]Paniers panier)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Paniers.Add(panier);
            ctx.SaveChanges();
        }
        //public void Delete(int id)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    ctx.Paniers.Remove(ctx.Paniers.Find(id));
        //    ctx.SaveChanges();
        //}
        public void Put([FromBody]Paniers panier)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Entry(panier).State = System.Data.Entity.EntityState.Modified;
            ctx.SaveChanges();
        }
    }
}
