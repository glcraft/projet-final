import { Articles } from "./articles";

export class Tags {
    id: number;
    nom: string;
    description: string | null;
    Articles: Array<Articles>;

    constructor(id: number, nom: string, description: string) {
        this.id = id;
        this.nom = nom;
        this.description = description;
    }
}
