import { Tags } from "./tags";

export class Articles {
    id:number;
    nom: string;
    prix: number;
    img: string;
    descript: string;
    marque: string;
    resume: string;
    date_ajout: Date;
    archive: Date;
    tags: Array<Tags>;
}
