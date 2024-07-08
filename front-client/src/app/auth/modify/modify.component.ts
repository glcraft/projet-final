import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Clients } from '@app/Models/clients';
import { AuthService } from '@app/Services/auth.service';
import { ClientsCrudService } from '@app/Services/clients-crud.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent {

  //client: Clients = new Clients(0, "", "");
  client: Clients;
  email:string;
  nom: string;
  adr_ligne1: string;
  adr_ligne2: string;
  adr_cp: string;
  adr_ville: string;

  constructor(private router: Router, private srv: ClientsCrudService, private authSrv: AuthService) { }

  ngOnInit() {

    // recuperation de l'utilisateur connecté dans le local storage
    this.client = JSON.parse(localStorage.getItem('client'));
    console.log(this.client);

  }

  async onSubmit() {
    console.log('submit');

    await this.srv.UpdateClient(this.client);
    // mise a jour des informations de l'utilisateur dans le session storage

    console.log(this.client);

    localStorage.setItem('client', JSON.stringify(this.client));
    this.router.navigate(['/']);  
  }
}
