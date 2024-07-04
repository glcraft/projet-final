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
    public class PanierLignesController : ApiController
    {
        public IEnumerable<PanierLignes> Get()
        {
            return new ProjetFinalEntities().PanierLignes.AsEnumerable();
        }
        public PanierLignes Get(int id)
        {
            return new ProjetFinalEntities().PanierLignes.Find(id);
        }
        public void Post([FromBody]PanierLignes panierligne)
        {
            var ctx = new ProjetFinalEntities();
            ctx.PanierLignes.Add(panierligne);
            ctx.SaveChanges();
        }
        //public void Delete(int id)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    ctx.PanierLignes.Remove(ctx.PanierLignes.Find(id));
        //    ctx.SaveChanges();
        //}
        public void Put([FromBody]PanierLignes panierligne)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Entry(panierligne).State = System.Data.Entity.EntityState.Modified;
            ctx.SaveChanges();
        }
    }
}
