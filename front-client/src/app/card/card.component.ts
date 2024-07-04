import { Component } from '@angular/core';
import { SearchService } from '@app/Services/search.service';
import { dataCards } from '../data/data.js';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  cards;
  searchValue: string = '';

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.searchValue$.subscribe(value => {
      this.searchValue = value;

      // filter cards on title == searchValue

      this.cards = dataCards;
      this.cards = this.cards.filter(card => card.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        card.resume.toLowerCase().includes(this.searchValue.toLowerCase()));


      // Faites quelque chose avec la valeur de recherche, comme filtrer une liste d'articles
    });
  }







}