import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panier } from '@app/Models/panier';
import { environment as env } from 'src/environment/environment';
import { PanierligneCrudService } from './panierligne-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PanierCrudService {

  constructor(private http: HttpClient, private srv: PanierligneCrudService) { }

  CreatePanier(p: Panier)
  {
    const body = JSON.stringify(p);

    this.http.post(`${env.baseDomainApi}/api/panier`, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).
      subscribe(
        response => {
        console.log("panier post article OK");
      },
        err => {
          console.log("panier post article KO")
        });

    p.lignes.forEach(ligne => {
      this.srv.CreatePanierLigne(ligne);
    });
  }

  GetPanierByID(id: number)
  {
    return this.http.get<Panier>(`${env.baseDomainApi}/api/panier/${id}`).toPromise().catch();
  }
}
