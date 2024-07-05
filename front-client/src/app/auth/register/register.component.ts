import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Clientregister } from '@app/Models/clientregister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nom: string = '';
  email: string = '';
  passwd: string = '';
  adr_ligne1: string = '';
  adr_ligne2: string = '';
  adr_cp: string = '';
  adr_ville: string = '';

  errorMessage: string = '';
  successMessage: string = '';
 
  constructor(private router: Router) { }

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.nom == '' || this.email == '' || this.passwd == '' ) {
      this.errorMessage = 'Completer les champs obligatoires';
      return;
    }

    // Check if email is valid
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'email invalide';
      return;
    }

    // Check if password is valid
    if (this.passwd.length < 6) {
      this.errorMessage = 'Mot de passe : 6 caractères minimum';
      return;
    }

   

    // Register the user

    // Create a new Clientregister object
    const client = new Clientregister(this.nom, this.email, this.passwd, {
      adr_ligne1: this.adr_ligne1,
      adr_ligne2: this.adr_ligne2,
      adr_cp: this.adr_cp,
      adr_ville: this.adr_ville
    });


    // Call the API to register the user
    // If the user is successfully registered, redirect to the login page
    // If there is an error, display the error message
    this.successMessage = 'User registered successfully';
    this.router.navigate(['/login']);
  }


  //// validation de l'email
  validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }



}
