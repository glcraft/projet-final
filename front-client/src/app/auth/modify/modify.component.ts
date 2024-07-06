import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Clients } from '@app/Models/clients';
import { ClientsCrudService } from '@app/Services/clients-crud.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent {

  client: Clients = new Clients(0, "", "");
  email:string;
  nom: string;
  adr_ligne1: string;
  adr_ligne2: string;
  adr_cp: string;
  adr_ville: string;

  constructor(private router: Router, private srv: ClientsCrudService) { }

  ngOnInit() {
    // recuperation de l'utilisateur connecté dans le session storage

    const userLogged = sessionStorage.getItem('userLogged');
    this.client = userLogged ? JSON.parse(userLogged) : {}; 

    this.client = JSON.parse(sessionStorage.getItem('userLogged'));
    console.log(this.client);


    this.email = this.client.email;
    this.nom = this.client.nom;
    this.adr_ligne1 = this.client.adr_ligne1;
    this.adr_ligne2 = this.client.adr_ligne2;
    this.adr_cp = this.client.adr_cp;
    this.adr_ville = this.client.adr_ville;
  }

  async onSubmit() {
    console.log('submit');

    this.client.nom = this.nom;
    this.client.adr_ligne1 = this.adr_ligne1;
    this.client.adr_ligne2 = this.adr_ligne2;
    this.client.adr_cp = this.adr_cp;
    this.client.adr_ville = this.adr_ville;



    await this.srv.UpdateClient(this.client);
    // mise a jour des informations de l'utilisateur dans le session storage

    console.log(this.client);

    sessionStorage.setItem('userLogged', JSON.stringify(this.client));
    this.router.navigate(['/']);  
  }
}
