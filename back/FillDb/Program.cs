using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Net.Http;
using System.IO;
using FillDb.Steam;
using FillDb.SteamSpy;
using Newtonsoft.Json;
using System.Threading;

namespace FillDb
{

    class Program
    {
        static async Task LoadTags(HttpClient client)
        {
            SteamSpyClient s_client = new SteamSpyClient(client);
            var tags = await s_client.GetInfo(220);
            Console.WriteLine(JsonConvert.SerializeObject(tags));
        }
        static async Task LoadGame(HttpClient client)
        {
            var db = new ProjetFinalEntities();
            SteamApi steam = new SteamApi(client);
            SteamSpyClient sspy = new SteamSpyClient(client);

            StoreService store = new StoreService(steam);
            var listApps = await store.GetListApps(new GetListAppsOptions { max_results = 200 });
            foreach (var app in listApps.apps)
            {
                    var appInfo = await steam.AppDetails(app.appid);
                    var moreInfo = await sspy.GetInfo(app.appid);
                    if (!db.Articles.Where(a => a.nom == appInfo.name).Any())
                    {
                        var dbArticle = db.Articles.Add(new Articles
                        {
                            nom = appInfo.name,
                            date_dajout = DateTime.Now,
                            description = appInfo.detailed_description,
                            resume = appInfo.short_description,
                            image = appInfo.header_image,
                            marque = moreInfo.developer,
                            prix = moreInfo.InitialPrice,
                        });
                        foreach (var tag in moreInfo.Tags)
                        {
                            var dbTagEnum = db.Tags.Where(t => t.nom == tag);
                            Tags dbTag;
                            if (!dbTagEnum.Any())
                            {
                                dbTag = db.Tags.Add(new Tags
                                {
                                    nom = tag
                                });
                            }
                            else
                                dbTag = dbTagEnum.First();
                            dbTag.Articles.Add(dbArticle);
                        }
                        await db.SaveChangesAsync();
                    }
            }
        }
        static void Main(string[] args)
        {
            var ctx = new ProjetFinalEntities();

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            LoadGame(client).Wait();
        }
    }
}
