import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment as env } from 'src/environment/environment';
import { PanierService } from './panier.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;
  client: any = null;

  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private http: HttpClient, private router: Router, private panierSrv: PanierService) { }

 
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${env.baseDomainApi}/api/auth/login`, { Email: email, Password: password })
      .pipe(
        tap((response: any) => {
          this.token = response.Token;
          this.client = response.Client;  
        })
      );
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  updateLoginStatus(status: boolean) {
    this.loggedIn.next(status);
    if(!status)
    {
      this.panierSrv.viderPanier();
    }
  }

  checkLoginStatus(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('client');
    this.updateLoginStatus(false);
    this.router.navigate(['/']);
  }
}
