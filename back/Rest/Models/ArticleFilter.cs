using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rest.Models
{
    public class ArticleFilter
    {
        public string Nom { get; set; }
        public int PrixMin { get; set; }
        public int PrixMax { get; set; }
        public string[] Tags { get; set; }
        public string Marque { get; set; }
    }
}