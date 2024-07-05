export class Clientregister {

nom: string;
email: string;
passwd: string;
adr_ligne1: string;
adr_ligne2: string;
adr_cp: string;
adr_ville: string;


constructor(nom: string, email: string, passwd, option: ClientsOptions = {})
{
    this.nom = nom;
    this.email = email;
    this.passwd = passwd;
    this.adr_ligne1 = option.adr_ligne1 || null;
    this.adr_ligne2 = option.adr_ligne2 || null;
    this.adr_cp = option.adr_cp || null;
    this.adr_ville = option.adr_ville || null;
}
}

class ClientsOptions {
    adr_ligne1?: string ;
    adr_ligne2?: string;
    adr_cp?: string;
    adr_ville?: string;
}