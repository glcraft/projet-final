import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket.component';
import { PanierComponent } from './panier/panier.component';
import { TestArticlesCrudComponent } from './TestCrud/test-articles-crud/test-articles-crud.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FilterComponent } from './filter/filter.component';
import { ModifyComponent } from './auth/modify/modify.component';
 

const routes: Routes = [
  { path: '', component: HomeComponent },
 // { path: 'footer', component: FooterComponent },
 // { path: 'header', component: HeaderComponent },
 // { path: 'carousel', component: CarouselComponent },
 // { path: 'navbar', component: NavbarComponent },
 // { path: 'card', component: CardComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'testcrudart', component: TestArticlesCrudComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'modify', component: ModifyComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
