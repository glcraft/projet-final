import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from '@app/Models/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsCrudService {

  constructor(private http: HttpClient) { }

  CreateClient(c: Clients)
  {
    const body = JSON.stringify(c);

    this.http.post("http://localhost:64886/api/Client", body, {
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

    this.http.put("http://localhost:64886/api/Client", body, {
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
    return this.http.get<Clients>("http://localhost:64886/api/Article/?email=" + email + "&password=" +pwd).toPromise().catch();
  }
}
