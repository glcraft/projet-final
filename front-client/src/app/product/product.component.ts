import { dataCards } from '../data/data.js';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articles } from '@app/Models/articles';
import { PanierService } from '@app/Services/panier.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  id: number;

  product:Articles ;
  
  constructor(private route: ActivatedRoute, private panierService: PanierService) { }
  ngOnInit(): void {
    //partie 1y
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    }); 
    this.product = dataCards.find(item => item.id == this.id);
  }

  ajouterAuPanier() {
    this.panierService.ajouterAuPanier(this.product.id, 1); // Ajoute 1 unité de l'article au panier
  }
}
