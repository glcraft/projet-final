import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panier } from '@app/Models/panier';
import { environment as env } from 'src/environment/environment';
import { PanierligneCrudService } from './panierligne-crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierCrudService {

  constructor(private http: HttpClient, private srv: PanierligneCrudService) { }

  CreatePanier(p: Panier)
  {

    console.log ("panier post article", p);


    const body = JSON.stringify(p);

    this.http.post(`${env.baseDomainApi}/api/paniers`, body, {
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

    // p.lignes.forEach(ligne => {
    //   this.srv.CreatePanierLigne(ligne);
    // });
  }

  GetPanierById(id: number)
  {
    return this.http.get<Panier>(`${env.baseDomainApi}/api/panier/${id}`).toPromise().catch();
  }

  GetAllPaniersByClient() : Observable<any[]>
  {
    return this.http.get<any[]>(`${env.baseDomainApi}/api/paniers/client`);
  }
}
