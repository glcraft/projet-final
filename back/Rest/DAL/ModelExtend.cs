﻿using System;
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
                var test = from tags in TagsPriv
                           select tags.nom;
                var testlist = test.ToList();
                return test;
            }
        }
    }

    public partial class Clients
    {
        public bool VerifPassword(string password)
        {
            return this.passwd == password;
        }
        public bool ChangePassword(string old, string @new)
        {
            if (!VerifPassword(old))
                return false;
            passwd = @new;
            return true;
        }
    }
}