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
  article1: Articles = new Articles(0, "", 0, "");
  article2: Articles = new Articles(0, "", 0, "");

  constructor(private srv: ArticlesCrudService) {}

  ngOnInit()
  {
    this.srv.GetAllArticle().then(a => this.listeA = a);
    this.loadArticleById(3);
    this.loadArticleByNom("Minecraft");
  }

  async loadArticleById(id: number) {
    try {
      this.article1 = await this.srv.GetArticleById(id);
      console.log(this.article1);
    } catch (error) {
      console.error("Error loading article by ID:", error);
    }
  }

  async loadArticleByNom(nom: string) {
    try {
      this.article2 = await this.srv.GetArticleByNom(nom);
      console.log(this.article2);
    } catch (error) {
      console.error("Error loading article by ID:", error);
    }
  }
}
