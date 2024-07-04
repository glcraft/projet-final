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
    public class TagsController : ApiController
    {
        public IEnumerable<Tags> Get()
        {
            return new ProjetFinalEntities().Tags.AsEnumerable();
        }
        public Tags Get(int id)
        {
            return new ProjetFinalEntities().Tags.Find(id);
        }
        //public void Post([FromBody]Tags tag)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    ctx.Tags.Add(tag);
        //    ctx.SaveChanges();
        //}
        //public void Delete(int id)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    ctx.Tags.Remove(ctx.Tags.Find(id));
        //    ctx.SaveChanges();
        //}
        //public void Put([FromBody]Tags tag)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    ctx.Entry(tag).State = System.Data.Entity.EntityState.Modified;
        //    ctx.SaveChanges();
        //}
    }
}
