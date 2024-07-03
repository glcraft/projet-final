import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articles } from '@app/Models/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesCrudService {

  constructor(private http: HttpClient) { }

  post(data)
  {
    const body = JSON.stringify(data);

    this.http.post("http://localhost:64886/api/Article", body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).
      subscribe(
        response => {
        console.log("service post article OK");
      },
        err => {
          console.log("service post article KO")
        });
  }

  GetAllArticle()
  {
    return this.http.get<Array<Articles>>("http://localhost:64886/api/Article").toPromise().catch();
  }

  GetArticleById(id: number)
  {
    return this.http.get<Articles>("http://localhost:64886/api/Article/" + id).toPromise().catch();
  }
}
