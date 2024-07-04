import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '@app/Models/commande';
import { environment as env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeCrudService {

  constructor(private http: HttpClient) { }

  CreateCommande(c: Commande)
  {
    const body = JSON.stringify(c);

    this.http.post(`${env.baseDomainApi}/api/panier`, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).
      subscribe(
        response => {
        console.log("commande post article OK");
      },
        err => {
          console.log("commande post article KO")
        });
  }

  GetAllCommandes()
  {
    return this.http.get<Array<Commande>>(`${env.baseDomainApi}/api/commandes`).toPromise().catch();
  }

  GetCommandeById(id: number)
  {
    return this.http.get<Commande>(`${env.baseDomainApi}/api/commandes/${id}`).toPromise().catch();
  }

}
