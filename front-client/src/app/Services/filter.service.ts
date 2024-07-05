import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articles } from '@app/Models/articles';
import { firstValueFrom } from 'rxjs';
import { environment as env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }

  async FilterArticles(a: any): Promise<Array<Articles>> {
    const body = JSON.stringify(a);

    return firstValueFrom(this.http.post<Array<Articles>>(`${env.baseDomainApi}/api/articles/search`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }));
  }
}


 