import { Component } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';
import { PanierService } from '@app/Services/panier.service';
import { SearchService } from '@app/Services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogged = false;

  constructor(private searchService: SearchService, private panierService: PanierService, private authService: AuthService) { }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchService.setSearchValue(inputElement.value);
  }

  getNbArticles() {
    return this.panierService.getNbArticles();
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(status => 
    {
      this.isLogged = status;
    });
  }

  onLogout() {
    this.authService.logout();
    this.isLogged = false;
  }
}