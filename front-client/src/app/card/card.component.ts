import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  cards = [
    { title: 'Card title 1', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Card title 2', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Card title 3', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Card title 4', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Card title 5', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
  ];
}