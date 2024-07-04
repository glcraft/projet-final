import { Component } from '@angular/core';
import { SearchService } from '@app/Services/search.service';
//import { dataCards } from '../data/data.js';
import { Articles } from '@app/Models/articles';
import { ArticlesCrudService } from '@app/Services/articles-crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  cards: any;
  searchValue: string = '';
  dataCards: Array<Articles> = new Array<Articles>();
  constructor(private searchService: SearchService, private srv: ArticlesCrudService ) { }

  ngOnInit() {
    this.srv.GetAllArticle()
    .then(a => this.dataCards = a)
      .then(() => this.cards = this.dataCards) ;

    
    this.searchService.searchValue$.subscribe(value => {
      this.searchValue = value;
      // filter cards on title == searchValue
      this.cards = this.dataCards;   // on reinitialise les cards
      this.cards = this.cards.filter(card => card.nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        card.resume.toLowerCase().includes(this.searchValue.toLowerCase()));

    });
  }







}