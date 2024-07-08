import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Clients } from '@app/Models/clients';
import { AuthService } from '@app/Services/auth.service';
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

  error: String;

  constructor( private router: Router, private srv : ClientsCrudService, private authSrv: AuthService) { }

  onSubmit(form: NgForm)
  {
    if(form.valid)
    {
      const {email, pwd} = form.value;
      this.authSrv.login(email, pwd).subscribe(
        response => {
          console.log('API response:', response);
          const token = response?.Token;
          const client = response?.Client;

          if (token) 
          {
            localStorage.setItem('token', token);
            console.log('Token stored:', token);
          } 
          else 
          {
            console.error('Token is undefined in the API response');
          }

          if (client) 
          {
            localStorage.setItem('client', JSON.stringify(client));
            console.log('Client stored:', client);
          } 
          else 
          {
            console.error('Client is undefined in the API response');
          }

          if(token && client)
          {
            alert("login successful");
            this.authSrv.updateLoginStatus(true);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.error = 'Invalid login credentials';
          alert("login error");
        }
      );
    }
  }

  /*async onLogin() {

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

  }*/
}







