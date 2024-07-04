import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panierligne } from '@app/Models/panierligne';
import { environment as env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PanierligneCrudService {

  constructor(private http: HttpClient) { }

  CreatePanierLigne(p: Panierligne)
  {
    const body = JSON.stringify(p);

    this.http.post(`${env.baseDomainApi}/api/panierligne`, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).
      subscribe(
        response => {
        console.log("panier ligne post article OK");
      },
        err => {
          console.log("panier ligne post article KO")
        });
  }

  GetPanierligneByID(id: number)
  {
    return this.http.get<Panierligne>(`${env.baseDomainApi}/api/panierligne/${id}`).toPromise().catch();
  }

}
