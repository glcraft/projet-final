import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Panier } from '../Models/panier';
import { Panierligne } from '@app/Models/panierligne';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


//////// class de service pour la gestion du panier //////////
export class PanierService {

    ////////  TO DO //////////
    // generer un uid pour chaque commande

  private panier: Panier = this.getPanierFromLocalStorage() || new Panier(1, null);
  private panierSubject = new BehaviorSubject<Panier>(this.panier);
  panier$ = this.panierSubject.asObservable();

  constructor(private router: Router) { }

  //////////////// local Storage ////////////////////////
  private getPanierFromLocalStorage(): Panier | null {
    const panierData = localStorage.getItem('panier');
    return panierData ? JSON.parse(panierData) : null;
  }

  private savePanierToLocalStorage(panier: Panier): void {
    localStorage.setItem('panier', JSON.stringify(panier));
  }

  ////////////////  Ajout au panier //////////////////////////
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
    this.saveAndNotifyPanierChange();
    this.router.navigate(['/panier']);
  }

  //////////////   maj quantité //////////////////////////
  mettreAJourQuantite(idArticle: number, quantite: number) {
    const existingLineIndex = this.panier.lignes.findIndex(line => line.idArticle === idArticle);
    if (existingLineIndex !== -1) {
      this.panier.lignes[existingLineIndex].quantite = quantite;
    }
    this.saveAndNotifyPanierChange();
  }

  ////////////// supprimer ligne //////////////////////////
  supprimerLigne(idArticle: number) {
    this.panier.lignes = this.panier.lignes.filter(line => line.idArticle !== idArticle);
    //this.panierSubject.next(this.panier);
    this.saveAndNotifyPanierChange();
  }

  ////////////  vider panier //////////////////////////
  viderPanier() {
    this.panier.lignes = [];
    //this.panierSubject.next(this.panier);
    this.saveAndNotifyPanierChange();
  }

  ////////////  valider panier //////////////////////////
  validerPanier() {

    ////////  creation d'id de commande  //////////
      this.panier.id = Date.now();  // id de commande


    /////// post  panier dans la base de donnée  ///////


    //// de chaque ligne de panier, on extrait les données pour les envoyer à la base de donnée
    this.panier.lignes.forEach(ligne => {
      console.log('Envoi de la ligne de commande:', ligne);
    });

    console.log('Panier validé:', this.panier);
  }
 
  ////////////  get panier //////////////////////////
  getPanier(): Panier {
    return this.panier;
  }
  
  ////////////  save to storage and notify panier change ////  
  private saveAndNotifyPanierChange() {
    this.savePanierToLocalStorage(this.panier);  //// local storage
    this.panierSubject.next(this.panier);  // notify subscribers
  }
}
