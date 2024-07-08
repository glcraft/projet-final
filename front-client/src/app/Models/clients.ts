export class Clients {
    Id: number;
    Nom: string;
    Email: string;
    Adr_ligne1: string;
    Adr_ligne2: string;
    Adr_cp: string;
    Adr_ville: string;
    archive: string;

    constructor(id: number, nom: string, email: string, option: ClientsOptions = {})
    {
        this.Id = id;
        this.Nom = nom;
        this.Email = email;
        this.Adr_ligne1 = option.adr_ligne1 || "";
        this.Adr_ligne2 = option.adr_ligne2 || "";
        this.Adr_cp = option.adr_cp || "";
        this.Adr_ville = option.adr_ville || "";
        this.archive = option.archive || "";
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
