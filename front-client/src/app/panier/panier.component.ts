import { Component, OnInit } from '@angular/core';
import { PanierService } from '../Services/panier.service';
import { Panier } from '../Models/panier';
import { Panierligne } from '../Models/panierligne';
import { Articles } from '@app/Models/articles';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panier: Panier;
  totalPanier: number = 0;
  article: Articles;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.panier = this.panierService.getPanier();
    this.calculerTotalPanier();
  }

  calculerTotalPanier() {
    this.totalPanier = this.panier.lignes.reduce((total, line) => total + (line.quantite * this.getPrixArticle(line.idArticle)), 0);
  }

  getArticle(idArticle: number): Articles {
    //  ici get article by id
    return this.article; 
  }

  getPrixArticle(idArticle: number): number {
   
    //this.article = this.getArticle(idArticle);
    //return this.article.prix;

    return 10;
  }

  mettreAJourQuantite(idArticle: number, nouvelleQuantite: number) {

    if(nouvelleQuantite < 1) {
      this.supprimerLigne(idArticle)
    }else{
          this.panierService.mettreAJourQuantite(idArticle, nouvelleQuantite);
    this.calculerTotalPanier();
    }

  }

  supprimerLigne(idArticle: number) {
    this.panierService.supprimerLigne(idArticle);
    this.calculerTotalPanier();
  }

  validerPanier() {
    this.panierService.validerPanier();
    this.panier = this.panierService.getPanier(); // Rafraîchir le panier après validation
    this.calculerTotalPanier();
  }

  viderPanier() {
    this.panierService.viderPanier();
    this.panier = this.panierService.getPanier(); // Rafraîchir le panier après vidage
    this.calculerTotalPanier();
  }
}
