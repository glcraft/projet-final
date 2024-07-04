import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tags } from '@app/Models/tags';
import { environment as env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsCrudService {

  constructor(private http: HttpClient) { }

  GetAllTags()
  {
    return this.http.get<Array<Tags>>(`${env.baseDomainApi}/api/Tag`).toPromise().catch();
  }

  GetTagsById(id: number)
  {
    return this.http.get<Tags>(`${env.baseDomainApi}/api/Tag` + id).toPromise().catch();
  }
}
