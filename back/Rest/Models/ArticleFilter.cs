using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rest.Models
{
    public class ArticleFilter
    {
        public string Nom { get; set; }
        public int[] Prix { get; set; }
        public string[] Tags { get; set; }
        public string Marque { get; set; }
        public int? Limit;
    }
}