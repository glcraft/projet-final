import { Tags } from "./tags";

export class Articles {
    id: number;
    nom: string;
    prix: number;
    img: string;
    descript: string;
    marque: string;
    resume: string;
    date_ajout: string;
    archive: string;
    tags: Array<Tags>;

    constructor(id: number, nom: string, prix: number, img: string, option: ArticlesOptions = {}) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.img = img;
        this.descript = option.descript || "Aucune description";
        this.marque = option.marque || "Aucune marque";
        this.resume = option.resume || "Aucun resume";
        this.date_ajout = option.date_ajout || "Aucune date";
        this.archive = option.archive || "Aucunes données";
    }
}

class ArticlesOptions {
    descript?: string;
    marque?: string;
    resume?: string;
    date_ajout?: string;
    archive?: string;
}