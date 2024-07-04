import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from '@app/Models/clients';
import { environment as env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsCrudService {

  constructor(private http: HttpClient) { }

  CreateClient(c: Clients)
  {
    const body = JSON.stringify(c);

    this.http.post(`${env.baseDomainApi}/api/Client`, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).
      subscribe(
        response => {
        console.log("client post article OK");
      },
        err => {
          console.log("client post article KO")
        });
  }

  UpdateClient(c: Clients)
  {
    const body = JSON.stringify(c);

    this.http.put(`${env.baseDomainApi}/api/Client`, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).
      subscribe(
        response => {
        console.log("client post article OK");
      },
        err => {
          console.log("client post article KO")
        });
  }

  LoginClient(email: string, pwd: string)
  {
    return this.http.get<Clients>(`${env.baseDomainApi}/api/Client/?email=${email}&password=${pwd}`).toPromise().catch();
  }
}
