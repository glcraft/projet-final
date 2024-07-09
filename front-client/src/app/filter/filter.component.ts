import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Articles } from '@app/Models/articles';
import { FilterService } from '@app/Services/filter.service';

interface SearchCriteria {
  priceMin?: number;
  priceMax?: number;
  nom?: string;
  marque?: string;
  tags?: string;
  trierpar?: string;
}

const SEARCH_LIMIT = 20;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  searchCriteria: SearchCriteria = {};
  prices: Array<number> | null = null;

  articles: Articles[] = [];
  filteredArticles: Array<Articles> = new Array<Articles>();

  lastArticle = 0;
  noMoreArticles = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private srv: FilterService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchCriteria = {
        priceMin: params['priceMin'],
        priceMax: params['priceMax'],
        nom: params['nom'],
        marque: params['marque'],
        tags: params['tags'],
        trierpar: params['trierpar']
      };
      (!this.prices 
        ? this.srv.getPrices().then(p => this.prices = [p[0]/100, p[1]/100]) 
        : new Promise<void>((resolve, reject) => resolve())
      ).then(() => {
        if (!this.searchCriteria.priceMin)
          this.searchCriteria.priceMin = this.prices[0];
        if (!this.searchCriteria.priceMax)
          this.searchCriteria.priceMax = this.prices[1];
      });
    });
  };

  async ngOnInit() {
    await this.initArticles();
  }

  async initArticles() {
    this.lastArticle = 0;
    this.filteredArticles = new Array<Articles>();
    await this.updateFilteredArticles(this.transformSearchOptions());
  }

  async onSearch() {
    await this.initArticles();

    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: this.formatCriteria(), 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }
  loadMore() {
    this.updateFilteredArticles(this.transformSearchOptions());
  }

  async updateFilteredArticles(toSearch: any) {
    try {
      const resp: Array<Articles> = await this.srv.FilterArticles(toSearch);
      if (resp.length == 0) {
        this.noMoreArticles = true;
        return;
      }
      this.filteredArticles = this.filteredArticles.concat(resp);
      this.lastArticle+=SEARCH_LIMIT;
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  }

  transformSearchOptions(){
    return {
      "Nom": this.searchCriteria.nom,
      "Prix": this.searchCriteria.priceMin && this.searchCriteria.priceMax ? [this.searchCriteria.priceMin*100, this.searchCriteria.priceMax*100]: undefined,
      "Tags": this.searchCriteria.tags ? this.searchCriteria.tags.split(',').map(tag => tag.trim()): undefined,
      "Marque": this.searchCriteria.marque,
      "TrierPar": this.searchCriteria.trierpar,
      Limit: SEARCH_LIMIT,
      Offset: this.lastArticle
    }
  }

  formatCriteria(): SearchCriteria {
    let prices = [undefined, undefined];
    if (this.prices) {
      if (this.searchCriteria.priceMin && this.searchCriteria.priceMin != this.prices[0]) {
        prices[0] = this.searchCriteria.priceMin;
      }
      if (this.searchCriteria.priceMax && this.searchCriteria.priceMax != this.prices[1]) {
        prices[1] = this.searchCriteria.priceMax;
      }
    }
    return {
      priceMin: prices[0],
      priceMax: prices[1],
      nom: !!this.searchCriteria.nom ? this.searchCriteria.nom : undefined,
      marque: !!this.searchCriteria.marque ? this.searchCriteria.marque : undefined,
      tags: !!this.searchCriteria.tags ? this.searchCriteria.tags : undefined,
      trierpar: !!this.searchCriteria.trierpar ? this.searchCriteria.trierpar : undefined
    }
  }
}