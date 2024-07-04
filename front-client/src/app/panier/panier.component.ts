import { Component, OnInit } from '@angular/core';
import { PanierService } from '../Services/panier.service';
import { Panier } from '../Models/panier';
import { Panierligne } from '../Models/panierligne';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panier: Panier;
  totalPanier: number = 0;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.panier = this.panierService.getPanier();
    this.calculerTotalPanier();
  }

  calculerTotalPanier() {
    this.totalPanier = this.panier.lignes.reduce((total, line) => total + (line.quantite * this.getPrixArticle(line.idArticle)), 0);
  }

  getPrixArticle(idArticle: number): number {
    // Fonction factice pour récupérer le prix de l'article basée sur son ID
    return 50; // Supposons que tous les articles ont le même prix
  }

  mettreAJourQuantite(idArticle: number, nouvelleQuantite: number) {
    this.panierService.mettreAJourQuantite(idArticle, nouvelleQuantite);
    this.calculerTotalPanier();
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
}
