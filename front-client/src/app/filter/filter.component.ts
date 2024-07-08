import { Component } from '@angular/core';
import { Articles } from '@app/Models/articles';
import { ArticlesCrudService } from '@app/Services/articles-crud.service';
import { FilterService } from '@app/Services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  searchCriteria = {
    priceMin: 0,
    priceMax: 0,
    nom: '',
    marque: '',
    tags: ''
  };


  articles: Articles[] = [];
  filteredArticles: Array<Articles> = new Array<Articles>();
  constructor(private srv: FilterService) { };

  ngOnInit() {
  }

  onSearch() {
    const { priceMin, priceMax, nom, marque, tags } = this.searchCriteria;
    const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());

    if (tagsArray.length === 1 && tagsArray[0] === '') { tagsArray.pop(); }

    let toSearch = {
      "Nom": this.searchCriteria.nom,
      "Prix": [this.searchCriteria.priceMin, this.searchCriteria.priceMax],
      "Tags": tagsArray,
      "Marque": this.searchCriteria.marque
    }
    this.getFilteredArticles(toSearch );
  }

  async getFilteredArticles(toSearch: any) {
    try {
      const resp: Array<Articles> = await this.srv.FilterArticles(toSearch);
      this.filteredArticles = resp;
      console.log(resp);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  }
}