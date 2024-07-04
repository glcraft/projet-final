import { Component } from '@angular/core';
import { SearchService } from '@app/Services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private searchService: SearchService) { }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchService.setSearchValue(inputElement.value);
}
}