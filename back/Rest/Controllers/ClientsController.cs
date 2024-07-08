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
    public class ClientsController : AuthApiController
    {
        public Clients Get()
        {
            var tokenData = GetData();
            return new ProjetFinalEntities().Clients.Find(tokenData.Id);
        }
        public void Post([FromBody]Clients client)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Clients.Add(client);
            ctx.SaveChanges();
        }
        public void Delete()
        {
            var tokenData = GetData();
            var ctx = new ProjetFinalEntities();
            var client = ctx.Clients.Find(tokenData.Id);
            client.archive = DateTime.Now;
            ctx.SaveChanges();
        }

        public void Put([FromBody]Clients client)
        {
            var tokenData = GetData();
            var ctx = new ProjetFinalEntities();
            ctx.Entry(client).State = System.Data.Entity.EntityState.Modified;
            ctx.SaveChanges();
        }
    }
}
