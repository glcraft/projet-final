import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Articles } from '@app/Models/articles';
import { FilterService } from '@app/Services/filter.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  articles: Array<Articles> = [];
  constructor(private http: HttpClient, private searchSrv: FilterService) { }

  async ngOnInit() {
    this.articles = await this.searchSrv.FilterArticles({Limit: 3});
  }
}
