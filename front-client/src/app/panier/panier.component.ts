import { Component, OnInit } from '@angular/core';
import { PanierService } from '../Services/panier.service';
import { Panier } from '../Models/panier';
import { Articles } from '@app/Models/articles';
import { ArticlesCrudService } from '@app/Services/articles-crud.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

export class PanierComponent implements OnInit {
  panier: Panier;
  totalPanier: number = 0;
  article: Articles;
  articlesDuPanier: Articles[] = [];
 

  constructor(private panierService: PanierService, private srv: ArticlesCrudService) { }

  ngOnInit(): void {
    this.panier = this.panierService.getPanier();
    this.setArticlesDuPanier();
  }
 // tableau d'articles du panier er calcul du total du panier
  setArticlesDuPanier() {
    this.totalPanier = 0;
    this.articlesDuPanier = [];
    this.panier.lignes.forEach(async (ligne) => {
    
      let article = await this.srv.GetArticleById(ligne.idArticle);
      this.articlesDuPanier.push(article);
      this.totalPanier += ligne.quantite*article.prix;
    });
  }

  async getArticle(id: number) {
    try {
      this.article = await this.srv.GetArticleById(id);
 
    } catch (error) {
      console.error("Error loading article by ID:", error);
    }
  }

  mettreAJourQuantite(idArticle: number, nouvelleQuantite: number) {
    if(nouvelleQuantite < 1) {
      this.supprimerLigne(idArticle)
    }else{
          this.panierService.mettreAJourQuantite(idArticle, nouvelleQuantite);
    };
    this.setArticlesDuPanier();
  }

  supprimerLigne(idArticle: number) {
    this.panierService.supprimerLigne(idArticle);
    this.setArticlesDuPanier();
  }

  validerPanier() {
    this.panierService.validerPanier();
    this.panier = this.panierService.getPanier(); // Rafraîchir le panier après validation
    this.setArticlesDuPanier();
  }

  viderPanier() {
    this.panierService.viderPanier();
    this.panier = this.panierService.getPanier(); // Rafraîchir le panier après vidage
    this.setArticlesDuPanier();
  }
}
