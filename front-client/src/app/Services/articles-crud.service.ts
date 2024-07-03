import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articles } from '@app/Models/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesCrudService {

  constructor(private http: HttpClient) { }

  GetAllArticle()
  {
    return this.http.get<Array<Articles>>("http://localhost:64886/api/Article").toPromise().catch();
  }

  GetArticleById(id: number)
  {
    return this.http.get<Articles>("http://localhost:64886/api/Article/" + id).toPromise().catch();
  }
}
