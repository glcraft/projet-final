using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Net.Http;
using System.IO;
using System.Runtime.Serialization;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace FillDb.Steam
{
    public class SteamApi
    {
        private HttpClient client;
        private string access_token;
        private string access_key;
        public SteamApi(HttpClient client)
        {
            this.client = client;
            access_token = GetEnvVar("STEAM_ACCESS_TOKEN");
            access_key = GetEnvVar("STEAM_ACCESS_KEY");
        }
        private static string GetEnvVar(string name)
        {
            var x = Environment.GetEnvironmentVariable(name);
            if (x == null)
                throw new ApplicationException($"{name} env var not found");
            return x;
        }
        internal async Task<T> Run<T>(string interf, string method, int version = 1, QueryBuilder query = null)
        {
            string url = $"https://api.steampowered.com/{interf}/{method}/v{version}/{query?.ToString()}";
            var resp = await client.GetAsync(url);
            resp.EnsureSuccessStatusCode();
            string result = await resp.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(result);
        }
        internal void AppendAccessToken(QueryBuilder query)
        {
            query.Append("access_token", access_token);
        }
        internal void AppendAccessKey(QueryBuilder query)
        {
            query.Append("access_key", access_key);
        }
        public async Task<AppInfo> AppDetails(int appid)
        {
            string url = $"https://store.steampowered.com/api/appdetails?appids={appid}";
            var resp = await client.GetAsync(url);
            resp.EnsureSuccessStatusCode();
            string result = await resp.Content.ReadAsStringAsync();
            var res = JsonConvert.DeserializeObject<Dictionary<string, AppInfoResponse>>(result);
            return res[appid.ToString()].data;
        }
    }
    [JsonObject]
    public struct SteamResponse<T>
    {
        public T response;
    }
    [JsonObject]
    public struct App
    {
        public int appid;
        public string name;
        public int last_modified;
        public int price_change_number;
    }
    [JsonObject]
    public struct ListApps
    {
        public List<App> apps;
        public bool have_more_results;
        public int last_appid;
    }
    public class GetListAppsOptions
    {
        public int? last_appid;
        public int? max_results;
    }
    public struct AppInfoResponse
    {
        public bool success;
        public AppInfo data;
    }
    public struct AppInfo
    {
        public string type;
        public string name;
        public string detailed_description;
        public string short_description;
        public string header_image;

    }
    class QueryBuilder
    {
        private StringBuilder str;
        public QueryBuilder()
        {
            str = new StringBuilder();
        }
        public void Append<T>(string name, T? val)
            where T : struct
        {
            if (val == null)
                return;
            if (str.Length > 0)
                str.Append('&');
            str.Append(name);
            str.Append('=');
            str.Append(val);
        }
        public void Append<T>(string name, T val)
        {
            if (str.Length > 0)
                str.Append('&');
            str.Append(name);
            str.Append('=');
            str.Append(val);
        }
        public override string ToString()
        {
            return "?"+str.ToString();
        }
    }
    public class StoreService
    {
        private SteamApi steam_api;
        public StoreService(SteamApi steam_api)
        {
            this.steam_api = steam_api;
        }
        public async Task<ListApps> GetListApps(GetListAppsOptions options)
        {
            QueryBuilder query = new QueryBuilder();
            steam_api.AppendAccessToken(query);
            query.Append("last_appid", options.last_appid);
            query.Append("max_results", options.max_results);
            return (await steam_api.Run<SteamResponse<ListApps>>("IStoreService", "GetAppList", 1, query)).response;
        }
        public async Task<ListApps> GetAppInfo(int appid)
        {
            QueryBuilder query = new QueryBuilder();
            steam_api.AppendAccessToken(query);
            return (await steam_api.Run<SteamResponse<ListApps>>("IStoreService", "GetAppList", 1, query)).response;
        }
    }
}
