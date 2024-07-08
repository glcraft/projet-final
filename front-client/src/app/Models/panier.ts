import { Panierligne } from "./panierligne";

export class Panier {
    id: number;
    idClient:  number | null; // -1 si non connecté
    lignes: Panierligne[];

    constructor(idClient: number) {
     
        this.idClient = idClient;
        this.lignes = [];
    }
}
