import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PanierService } from '../Services/panier.service';
import { Panier } from '../Models/panier';
import { Articles } from '@app/Models/articles';
import { ArticlesCrudService } from '@app/Services/articles-crud.service';
import { ModalService } from '@app/Services/modal.service';
import { ToastService } from '@app/Services/toast.service';
import { Router } from '@angular/router';
import { formatPrixEuros } from '@app/utils/utils';

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
  @ViewChild('myModal') myModal!: TemplateRef<any>;
 

  constructor(private panierService: PanierService, private srv: ArticlesCrudService, private modalService: ModalService, private toastService:ToastService, private router:Router) { }

  ngOnInit(): void {
    this.panier = this.panierService.getPanier();
    this.setArticlesDuPanier();
  }
 // tableau d'articles du panier er calcul du total du panier
  setArticlesDuPanier() {
    console.log (this.panier)
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
    this.setArticlesDuPanier() 
  }

  viderPanier() {
    this.panierService.viderPanier();
    this.panier = this.panierService.getPanier(); // Rafraîchir le panier après vidage
    this.setArticlesDuPanier();
  }

  ///// modal 
  //// toDo 
  open(content: TemplateRef<any>) {
    this.modalService.openModal(content);
  }

  close() {
    this.modalService.closeModal();
  }
  onValiderPanier() {
    this.validerPanier();
    //this.open(this.myModal);
    this.toastService.showToast("Panier validé");
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  formatPrix(centimes: number): string {
    return formatPrixEuros(centimes);
  }
  formatImg(image: string) {
    return `../../../assets/images/${image}`;
  }


  ///// return l'index dans le tableau d'articles du panier de l'article dont l'id est passé en paramètre
  getIndex(idArticle: number): number {
    return this.articlesDuPanier.findIndex(article => article.id === idArticle);
  }


}


