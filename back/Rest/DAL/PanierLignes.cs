//------------------------------------------------------------------------------
// <auto-generated>
//     Ce code a été généré à partir d'un modèle.
//
//     Des modifications manuelles apportées à ce fichier peuvent conduire à un comportement inattendu de votre application.
//     Les modifications manuelles apportées à ce fichier sont remplacées si le code est régénéré.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Rest.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class PanierLignes
    {
        public int id_panier { get; set; }
        public int id_article { get; set; }
        public Nullable<int> quantite { get; set; }
    
        public virtual Articles Articles { get; set; }
        public virtual Paniers Paniers { get; set; }
    }
}
