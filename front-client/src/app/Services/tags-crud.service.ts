import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tags } from '@app/Models/tags';

@Injectable({
  providedIn: 'root'
})
export class TagsCrudService {

  constructor(private http: HttpClient) { }

  GetAllTags()
  {
    return this.http.get<Array<Tags>>("http://localhost:64886/api/Tag").toPromise().catch();
  }

  GetTagsById(id: number)
  {
    return this.http.get<Tags>("http://localhost:64886/api/Tag" + id).toPromise().catch();
  }
}
