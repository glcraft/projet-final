import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Panier } from '../Models/panier';
import { Panierligne } from '@app/Models/panierligne';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  //private panier: Panier = new Panier(1, null); // Initialisation avec un panier vide
  private panier: Panier = this.getPanierFromLocalStorage() || new Panier(1, null);
  private panierSubject = new BehaviorSubject<Panier>(this.panier);
  panier$ = this.panierSubject.asObservable();

  constructor() { }


  //////////////// local Storage ////////////////////////
  private getPanierFromLocalStorage(): Panier | null {
    const panierData = localStorage.getItem('panier');
    return panierData ? JSON.parse(panierData) : null;
  }

  private savePanierToLocalStorage(panier: Panier): void {
    localStorage.setItem('panier', JSON.stringify(panier));
  }

  ////////////////  Ajout au panier ///////////////////////

  ajouterAuPanier(idArticle: number, quantite: number) {
    const existingLineIndex = this.panier.lignes.findIndex(line => line.idArticle === idArticle);

    if (existingLineIndex !== -1) {
      // Le produit existe déjà dans le panier, augmenter la quantité
      this.panier.lignes[existingLineIndex].quantite += quantite;
    } else {
      // Ajouter une nouvelle ligne au panier
      const nouvelleLigne = new Panierligne(this.panier.id, idArticle, quantite);
      this.panier.lignes.push(nouvelleLigne);
    }

    console.log('Panier  :', this.panier);

    //this.panierSubject.next(this.panier);
    this.saveAndNotifyPanierChange();
  }

  mettreAJourQuantite(idArticle: number, quantite: number) {
    const existingLineIndex = this.panier.lignes.findIndex(line => line.idArticle === idArticle);

    if (existingLineIndex !== -1) {
      this.panier.lignes[existingLineIndex].quantite = quantite;
    }

   // this.panierSubject.next(this.panier);
    this.saveAndNotifyPanierChange();
  }

  supprimerLigne(idArticle: number) {
    this.panier.lignes = this.panier.lignes.filter(line => line.idArticle !== idArticle);
    //this.panierSubject.next(this.panier);
    this.saveAndNotifyPanierChange();
  }

  viderPanier() {
    this.panier.lignes = [];
    //this.panierSubject.next(this.panier);
    this.saveAndNotifyPanierChange();
  }

  validerPanier() {
    // Implémenter la logique de validation ici
    console.log('Panier validé:', this.panier);
  }

  getPanier(): Panier {
    return this.panier;
  }

  private saveAndNotifyPanierChange() {
    this.savePanierToLocalStorage(this.panier);  //// local storage
    this.panierSubject.next(this.panier);  // notify subscribers
  }




}
