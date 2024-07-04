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
    public class CommandesController : ApiController
    {
        public IEnumerable<Commandes> Get()
        {
            return new ProjetFinalEntities().Commandes.AsEnumerable();
        }
        public Commandes Get(int id)
        {
            return new ProjetFinalEntities().Commandes.Find(id);
        }
        public void Post([FromBody]Commandes commande)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Commandes.Add(commande);
            ctx.SaveChanges();
        }
        public void Delete(int id)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Commandes.Remove(ctx.Commandes.Find(id));
            ctx.SaveChanges();
        }
        public void Put([FromBody]Commandes commande)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Entry(commande).State = System.Data.Entity.EntityState.Modified;
            ctx.SaveChanges();
        }
    }
}
