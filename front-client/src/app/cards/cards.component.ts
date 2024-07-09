import { Component, Input } from '@angular/core';
import { Articles } from '@app/Models/articles';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() articles: Array<Articles> = new Array<Articles>();
}
