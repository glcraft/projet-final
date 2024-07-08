import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articles } from '@app/Models/articles';
import { ArticlesCrudService } from '@app/Services/articles-crud.service';
import { PanierService } from '@app/Services/panier.service';
import { formatPrixEuros } from '@app/utils/utils';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  id: number;

  product: Articles;

  constructor(private route: ActivatedRoute, private router: Router, private panierService: PanierService, private srv: ArticlesCrudService) { }
  ngOnInit(): void {
    //partie 1
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    //this.product = dataCards.find(item => item.id == this.id);
    this.loadArticleById(this.id);

  }
  async loadArticleById(id: number) {
    try {
      this.product = await this.srv.GetArticleById(id);
    } catch (error) {
      console.error("Error loading article by ID:", error);
    }
  }

 

  ajouterAuPanier() {
    this.panierService.ajouterAuPanier(this.product.id, 1); // Ajoute 1 unité de l'article au panier
    this.router.navigate(['/panier']);
  }

  formatImg(image: string) {
    return image;
  }

  formatPrix(centimes: number): string {
    return formatPrixEuros(centimes);
  }



}
