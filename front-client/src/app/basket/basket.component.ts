import { Component } from '@angular/core';
import { Articles } from '@app/Models/articles';
import { ArticlesCrudService } from '@app/Services/articles-crud.service';
import { PanierCrudService } from '@app/Services/panier-crud.service';
import { formatPrixEuros } from '@app/utils/utils';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  paniers: any[] = [];
  articlesDuPanier: { [id: number]: any } = {};

  constructor(private srvPanier: PanierCrudService, private srvArticle: ArticlesCrudService) {}

  ngOnInit(): void {
    this.loadPaniers();
  }

  /*async loadPaniers() {
    try {
      const data = await this.srvPanier.GetAllPaniersByClient().toPromise();
      this.paniers = data;
      console.log(this.paniers)
      for (let panier of this.paniers) {
        console.log("Inspecter panier : ", panier)
        if (panier.Lignes && Array.isArray(panier.Lignes)) {
          for (let ligne of panier.Lignes) {
            console.log('Inspecter ligne:', ligne);
            let article = await this.srvArticle.GetArticleById(ligne.IdArticle);
            ligne.articleDetails = article;
            console.log(ligne.articleDetails);
          }
        }
      }
    } catch (error) {
      console.error('Error loading paniers:', error);
    }
  }*/

    async loadPaniers() {
      try {
        const data = await this.srvPanier.GetAllPaniersByClient().toPromise();
        this.paniers = data;
        for (let panier of this.paniers) {
          for (let ligne of panier.Lignes) {
            if (!this.articlesDuPanier[ligne.IdArticle]) {
              const article = await this.srvArticle.GetArticleById(ligne.IdArticle);
              if (article) {
                this.articlesDuPanier[ligne.IdArticle] = article;
              }
            }
          }
        }
      } catch (error) {
        console.error('Error loading paniers:', error);
      }
    }

    formatImg(image: string) {
      return `../../../assets/images/${image}`;
    }
  
    formatPrix(prix: number): string {
      return formatPrixEuros(prix);
    }
}
