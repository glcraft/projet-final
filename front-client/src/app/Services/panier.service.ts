import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Panier } from '../Models/panier';
import { Panierligne } from '@app/Models/panierligne';
import { Router } from '@angular/router';
import { Clients } from '@app/Models/clients';
import { PanierCrudService } from './panier-crud.service';

@Injectable({
  providedIn: 'root'
})


//////// class de service pour la gestion du panier //////////
export class PanierService {

  clientId: number = -1;

  private panier: Panier = this.getPanierFromLocalStorage() || new Panier(this.clientId);
  private panierSubject = new BehaviorSubject<Panier>(this.panier);
  panier$ = this.panierSubject.asObservable();

  constructor(private router: Router, private pannierCrud:PanierCrudService ) { }

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

    // check si l'id de luser en session storage est le même que celui du panier

    const userLogged = sessionStorage.getItem('userLogged');
    let connectedClientId = userLogged ? (JSON.parse(userLogged).id) : Number(-1);

    // check si un pannier exsite deja dans le local storage
    let panierData = localStorage.getItem('panier');

    ////  pas panier dans le local storage
    if (panierData == null) {
      this.panier = new Panier(connectedClientId);
    } else {
      ///  si même client, on recupère le panier
      if (this.panier.idClient == connectedClientId) {
        this.panier = JSON.parse(panierData);
      }
      else {
        // si client différent, on crée un nouveau panier
        this.panier = new Panier(connectedClientId);
      }

    }

    const existingLineIndex = this.panier.lignes.findIndex(line => line.idArticle === idArticle);
    if (existingLineIndex !== -1) {
      // Le produit existe déjà dans le panier, augmenter la quantité
      this.panier.lignes[existingLineIndex].quantite += quantite;
    } else {
      // Ajouter une nouvelle ligne au panier
      const nouvelleLigne = new Panierligne(idArticle, quantite);
      this.panier.lignes.push(nouvelleLigne);
    }
    this.saveAndNotifyPanierChange();
    
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
    // effacement de la cle dans le local storage
    localStorage.removeItem('panier');
  }



  ////////////  valider panier //////////////////////////
  validerPanier() {

    let panierData = localStorage.getItem('panier');
    if (panierData == null) {
     return;
    }
    let panier = JSON.parse(panierData);

    // check si il y a bien un client connecté et que l'id client n'est pas -1 
    const userLogged = sessionStorage.getItem('userLogged');
    const token = localStorage.getItem('token');
    const client = localStorage.getItem('client')

    if (token == null) 
    {
      alert('Vous devez être connecté pour valider votre panier.');
      this.router.navigate(['/login']);
    } 
    else if (token != null && panier.idClient == -1) 
      {  // si client non connecté quand fait son panier - recupère la commande
      panier.idClient = JSON.parse(client).id;
      this.processCommand(panier);
    } 
    else 
    {
      //check si le panier n'est pas vide et que le client connecté est le même que celui du panier
      if (this.panier.lignes.length > 0 && panier.idClient == JSON.parse(client).id) {
        // on enregistre le panier dans la base de données
        this.processCommand(panier);
      } 
      else 
      {
        console.log('Panier vide ou client différent');
      }
    }

    /*
    if (userLogged == null) 
    {
      alert('Vous devez être connecté pour valider votre panier.');
      this.router.navigate(['/login']);
    } 
    else if (userLogged != null && panier.idClient == -1) 
      {  // si client non connecté quand fait son panier - recupère la commande
      panier.idClient = JSON.parse(userLogged).id;
      this.processCommand(panier);
    } 
    else 
    {
      //check si le panier n'est pas vide et que le client connecté est le même que celui du panier
      if (this.panier.lignes.length > 0 && panier.idClient == JSON.parse(userLogged).id) {
        // on enregistre le panier dans la base de données
        this.processCommand(panier);
      } 
      else 
      {
        console.log('Panier vide ou client différent');
      }
    } */
  }

  processCommand(panier){

    // ToDo
    // enregistrer le panier dans la base de données
    this.pannierCrud.CreatePanier(panier);



    console.log('Panier validé:', panier);
        this.panier.lignes = [];
        this.saveAndNotifyPanierChange();
        // effacement de la cle dans le local storage
        localStorage.removeItem('panier');
  }

  ////////////  get panier //////////////////////////
  getPanier(): Panier {
    return this.panier;
  }

  /// nombre d'articles dans le panier
  getNbArticles(): number {
    return this.panier.lignes.reduce((acc, line) => acc + line.quantite, 0);
  }


  ////////////  save to storage and notify panier change ////  
  private saveAndNotifyPanierChange() {
    this.savePanierToLocalStorage(this.panier);  //// local storage
    this.panierSubject.next(this.panier);  // notify subscribers
  }
}
