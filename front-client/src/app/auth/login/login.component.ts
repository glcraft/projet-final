import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Clients } from '@app/Models/clients';
import { ClientsCrudService } from '@app/Services/clients-crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  listeC: Array<Clients>;

  constructor( private router: Router, private srv : ClientsCrudService) { }

  async onLogin() {

    // Recuperation de la liste des utilisateurs
    await this.srv.GetAllClient()
    .then(c => this.listeC = c)

    // Verification de l'existence de l'utilisateur
    if(this.listeC.find(c => c.email == this.username))
    {
      // Si l'utilisateur existe, on le redirige vers la page d'accueil
      this.router.navigate(['/']);
      // on passe les infos utilisateur en session storage
      sessionStorage.setItem('userLogged', JSON.stringify(this.listeC.find(c => c.email == this.username)));
    } else {}




    // Si l'utilisateur existe, on le redirige vers la page d'accueil
    // Sinon, on affiche un message d'erreur
   // this.router.navigate(['/']);

  }
}







