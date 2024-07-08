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
    public class ClientsController : ApiController
    {
        public IEnumerable<Clients> Get()
        {
            return new ProjetFinalEntities().Clients.AsEnumerable();
        }
        public Clients Get(int id)
        {
            return new ProjetFinalEntities().Clients.Find(id);
        }
        public void Post([FromBody]Clients client)
        {
            var ctx = new ProjetFinalEntities();
            ctx.Clients.Add(client);
            ctx.SaveChanges();
        }
        public void Delete(int id)
        {
            var ctx = new ProjetFinalEntities();
            var client = ctx.Clients.Find(id);
            client.archive = DateTime.Now;
            ctx.SaveChanges();
        }

        public void Put([FromBody]Clients client)
        {
            var ctx = new ProjetFinalEntities();
            var existingClient = ctx.Clients.Find(client.id);

            if(existingClient != null)
            {
                existingClient.nom = client.nom;
                existingClient.email = client.email;
                existingClient.adr_ligne1 = client.adr_ligne1;
                existingClient.adr_ligne2 = client.adr_ligne2;
                existingClient.adr_cp = client.adr_cp;
                existingClient.adr_ville = client.adr_ville;

                ctx.SaveChanges();
            }
            //ctx.Entry(client).State = System.Data.Entity.EntityState.Modified;
            //ctx.SaveChanges();
        }
    }
}
