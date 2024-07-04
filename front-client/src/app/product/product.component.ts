import { dataCards } from '../data/data.js';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articles } from '@app/Models/articles';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  id: number;

  product:Articles = new Articles();
  
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {

    //partie 1y
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    }); 

    this.product = dataCards.find(item => item.id == this.id);

  }



}
