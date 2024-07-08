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
    public class CreatePanierLigne
    {
        public int idArticle;
        public int quantite;
    }
    public class CreatePanier
    {
        public List<CreatePanierLigne> lignes;
    }
    [EnableCors("*", "*", "*")]
    public class PaniersController : AuthApiController
    {
        public IEnumerable<Paniers> Get()
        {
            return GetClientPanier().AsEnumerable();
        }
        public Paniers Get(int id)
        {
            var result = GetClientPanier()
                .Where(p => p.id == id)
                .FirstOrDefault();
            if (result == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);
            return result;
        }
        public void Post([FromBody]CreatePanier panier)
        {
            var tokenData = GetData();
            var ctx = new ProjetFinalEntities();
            var dbPanier = ctx.Paniers.Add(new Paniers { id_client = tokenData.Id, datetime = DateTime.Now });
            foreach (var ligne in panier.lignes)
            {
                dbPanier.PanierLignes.Add(new PanierLignes
                {
                    id_article = ligne.idArticle,
                    id_panier = dbPanier.id,
                    quantite = ligne.quantite
                });
            }
            ctx.SaveChanges();
        }
        private IQueryable<Paniers> GetClientPanier()
        {
            var tokenData = GetData();
            return new ProjetFinalEntities().Paniers.Where(p => p.id_client == tokenData.Id);
        }
        //public void Delete(int id)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    ctx.Paniers.Remove(ctx.Paniers.Find(id));
        //    ctx.SaveChanges();
        //}
        //public void Put([FromBody]Paniers panier)
        //{
        //    var ctx = new ProjetFinalEntities();
        //    ctx.Entry(panier).State = System.Data.Entity.EntityState.Modified;
        //    ctx.SaveChanges();
        //}
    }
}
