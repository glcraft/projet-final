// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchValueSubject = new BehaviorSubject<string>('');
  searchValue$ = this.searchValueSubject.asObservable();

  setSearchValue(value: string) {
    this.searchValueSubject.next(value);
  }
}
