import { Component, Input } from '@angular/core';
import { Articles } from '@app/Models/articles';
import { PanierService } from '@app/Services/panier.service';
import { ToastService } from '@app/Services/toast.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() article:Articles;

  constructor(private panierService: PanierService, private toastService: ToastService ) { }

  ajouterAuPanier() {
    this.panierService.ajouterAuPanier(this.article.id, 1); // Ajoute 1 unité de l'article au panier
    this.toastService.showToast("Article ajouté au panier");
  } 
}
