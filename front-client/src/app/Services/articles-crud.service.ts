import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articles } from '@app/Models/articles';
import { environment as env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesCrudService {

  constructor(private http: HttpClient) { }

  GetAllArticle()
  {
    return this.http.get<Array<Articles>>(`${env.baseDomainApi}/api/articles`).toPromise().catch();
  }

  /*GetArticleById(id: number)
  {
    return this.http.get<Articles>(`${env.baseDomainApi}/api/articles/${id}`).toPromise().catch();
  }*/

  async GetArticleById(id: number): Promise<Articles | null> {
    try {
      const article = await this.http.get<Articles>(`${env.baseDomainApi}/api/articles/${id}`).toPromise();
      return article;
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      return null;  
    }
  }

  GetArticleByNom(nom: string)
  {
    return this.http.get<Articles>(`${env.baseDomainApi}/api/articles?nom=${nom}`).toPromise().catch();
  }
}
