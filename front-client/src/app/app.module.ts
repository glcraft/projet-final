import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { CarouselComponent } from './carousel/carousel.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { CardComponent } from './_card/card.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket.component';
import { PanierComponent } from './panier/panier.component';
import { TestArticlesCrudComponent } from './TestCrud/test-articles-crud/test-articles-crud.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FilterComponent } from './filter/filter.component';
import { ModifyComponent } from './auth/modify/modify.component';
import { ModalService } from './Services/modal.service';
import { authInterceptor } from './Services/auth.interceptor.service';
import { TagsComponent } from './tags/tags.component';
import { CardsComponent } from './cards/cards.component';
 

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CarouselComponent,
    NavbarComponent,
    CardComponent,
    HomeComponent,
    ProductComponent,
    BasketComponent,
    PanierComponent,
    TestArticlesCrudComponent,
    LoginComponent,
    RegisterComponent,
    FilterComponent,
    ModifyComponent,
    TagsComponent,
    CardsComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  
  bootstrap: [AppComponent],
  providers: [
    ModalService,
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
  
})
export class AppModule { }
