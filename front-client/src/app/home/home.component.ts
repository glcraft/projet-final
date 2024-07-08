import { Component } from '@angular/core';
import { Articles } from '@app/Models/articles';
import { FilterService } from '@app/Services/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  articles: Array<Articles> = [];
  constructor(public searchService: FilterService) {

  }

  async ngOnInit() {
    this.articles = await this.searchService.FilterArticles({limit: 3*8})
  }
}