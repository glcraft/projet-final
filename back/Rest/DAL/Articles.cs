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
    
    public partial class Articles
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Articles()
        {
            this.PanierLignes = new HashSet<PanierLignes>();
            this.TagsPriv = new HashSet<Tags>();
        }
    
        public int id { get; set; }
        public string nom { get; set; }
        public Nullable<int> prix { get; set; }
        public string image { get; set; }
        public string description { get; set; }
        public string marque { get; set; }
        public string resume { get; set; }
        public Nullable<System.DateTime> date_dajout { get; set; }
        public Nullable<System.DateTime> archive { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PanierLignes> PanierLignes { internal get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tags> TagsPriv { private get; set; }
    }
}
