using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace FillDb.SteamSpy
{
    [JsonObject]
    public struct AppDetails
    {
        public Dictionary<string, int> tags;
        public string developer;
        public string initialprice;
        public IEnumerable<string> Tags { get => tags.Select(kv => kv.Key.Trim()); }
        public int InitialPrice { get => int.Parse(initialprice); }
    }
    public class SteamSpyClient
    {
        private HttpClient client;
        public SteamSpyClient(HttpClient client)
        {
            this.client = client;
        }
        public async Task<AppDetails> GetInfo(int appid)
        {
            string url = $"https://steamspy.com/api.php?request=appdetails&appid={appid}";
            var resp = await client.GetAsync(url);
            resp.EnsureSuccessStatusCode();
            string result = await resp.Content.ReadAsStringAsync();
            AppDetails app = JsonConvert.DeserializeObject<AppDetails>(result);
            return app;
        }
    }
}
