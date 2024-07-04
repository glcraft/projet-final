using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rest.DAL
{
    public partial class Articles
    {
        public IEnumerable<string> Tags
        {
            get
            {
                var ctx = new ProjetFinalEntities();

                var test = from tags in TagsPriv
                           select tags.nom;
                var testlist = test.ToList();
                return test;
            }
        }
    }
}