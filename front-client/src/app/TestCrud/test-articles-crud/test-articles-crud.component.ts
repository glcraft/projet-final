import { Component } from '@angular/core';
import { Articles } from '@app/Models/articles';
import { ArticlesCrudService } from '@app/Services/articles-crud.service';

@Component({
  selector: 'app-test-articles-crud',
  templateUrl: './test-articles-crud.component.html',
  styleUrls: ['./test-articles-crud.component.css']
})
export class TestArticlesCrudComponent {

  listeA: Array<Articles> = new Array<Articles>();

  constructor(private srv: ArticlesCrudService) {}

  ngOnInit()
  {
    this.srv.GetAllArticle().then(a => this.listeA = a);
  }
}
