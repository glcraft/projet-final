using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rest.Models
{
    public class PanierTransfert
    {
        public class PanierThrow
        {
            public int Id { get; set; }
            public DateTime? DateTime { get; set; }
            public List<PanierLigneThrow> Lignes { get; set; }
        }

        public class PanierLigneThrow
        {
            public int IdArticle { get; set; }
            public int? Quantite { get; set; }
        }
    }
}