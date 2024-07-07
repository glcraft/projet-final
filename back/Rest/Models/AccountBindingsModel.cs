using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rest.Models
{
    public class AccountBindingsModel
    {
        public class LoginBindingModel
        { 
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class ClientThrow
        {
            public int Id { get; set; }
            public string Nom { get; set; }
            public string Email { get; set; }
            public string AdrLigne1 { get; set; }
            public string AdrLigne2 { get; set; }
            public string AdrCp { get; set; }
            public string AdrVille { get; set; }
        }
    }
}