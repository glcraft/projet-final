import { Component } from '@angular/core';
import { Articles } from '@app/Models/articles';
import { ArticlesCrudService } from '@app/Services/articles-crud.service';

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
  constructor(private srv: ArticlesCrudService) { };

  ngOnInit() {
    this.srv.GetAllArticle()
      .then(a => this.articles = a)
  }

  onSearch() {
    const { priceMin, priceMax, nom, marque, tags } = this.searchCriteria;
    const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());
    this.filteredArticles = this.articles.filter(article => {
      const isInPriceRange = article.prix >= priceMin && article.prix <= priceMax;
      const nameMatches = !nom || article.nom.toLowerCase().includes(nom.toLowerCase());
      const brandMatches = !marque || article.marque.toLowerCase().includes(marque.toLowerCase());
      const tagsMatch = !tags || tagsArray.some(tag => article.Tags.map(t => t.toLowerCase()).includes(tag));
      return isInPriceRange && nameMatches && brandMatches && tagsMatch;
    });

  }
}
