export class Panierligne {
    idPanier: number;
    idArticle: number;
    quantite: number;

    constructor(idPanier: number, idArticle: number, quantite: number) {    
        this.idPanier = idPanier;
        this.idArticle = idArticle;
        this.quantite = quantite;
    }
}
