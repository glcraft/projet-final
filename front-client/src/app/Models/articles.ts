import { Tags } from "./tags";

export class Articles {
    id: number;
    nom: string;
    prix: number;
    image: string;
    description: string;
    marque: string;
    resume: string;
    date_dajout: string;
    archive: string;
    Tags: Array<Tags>;

    constructor(id: number, nom: string, prix: number, img: string, option: ArticlesOptions = {}) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.image = img;
        this.description = option.description || "";
        this.marque = option.marque || "";
        this.resume = option.resume || "";
        this.date_dajout = option.date_dajout || "";
        this.archive = option.archive || "";
    }
}

class ArticlesOptions {
    description?: string;
    marque?: string;
    resume?: string;
    date_dajout?: string;
    archive?: string;
}