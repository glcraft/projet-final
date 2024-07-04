export class Clients {
    id: number;
    nom: string;
    email: string;
    passwd: string;
    adr_ligne1: string;
    adr_ligne2: string;
    adr_cp: string;
    adr_ville: string;
    archive: string;
    statut: string;

    constructor(id: number, nom: string, email: string, password: string, option: ClientsOptions = {})
    {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.passwd = password;
        this.adr_ligne1 = option.adr_ligne1 || "";
        this.adr_ligne2 = option.adr_ligne2 || "";
        this.adr_cp = option.adr_cp || "";
        this.adr_ville = option.adr_ville || "";
        this.archive = option.archive || "";
        this.statut = option.statut || "";
    }
}

class ClientsOptions {
    adr_ligne1 ?: string;
    adr_ligne2 ?: string;
    adr_cp ?: string;
    adr_ville ?: string;
    archive ?: string;
    statut ?: string;
}
