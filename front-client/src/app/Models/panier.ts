import { Panierligne } from "./panierligne";

export class Panier {

    id: number;
    idClient:  number | null; // peut être null si non identifié
    lignes: Panierligne[];

    constructor(id: number, idClient: number) {
        this.id = id;
        this.idClient = idClient;
        this.lignes = [];
    }
}
