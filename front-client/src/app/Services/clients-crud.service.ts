import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientregister } from '@app/Models/clientregister';
import { Clients } from '@app/Models/clients';
import { environment as env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsCrudService {

  constructor(private http: HttpClient) { }

  CreateClient(c: Clientregister)
  {
    const body = JSON.stringify(c);

    this.http.post(`${env.baseDomainApi}/api/Clients`, body, {
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

    this.http.put(`${env.baseDomainApi}/api/Clients/`, body, {
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
    return this.http.get<Clients>(`${env.baseDomainApi}/api/Clients/?email=${email}&password=${pwd}`).toPromise().catch();
  }

  GetAllClient()
  {
    return this.http.get<Array<Clients>>(`${env.baseDomainApi}/api/Clients`).toPromise().catch();
  } 
}
