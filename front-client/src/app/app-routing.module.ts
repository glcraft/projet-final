import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
 // { path: 'footer', component: FooterComponent },
 // { path: 'header', component: HeaderComponent },
 // { path: 'carousel', component: CarouselComponent },
 // { path: 'navbar', component: NavbarComponent },
 // { path: 'card', component: CardComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'basket', component: BasketComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
