import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterLanguagesPipe } from './helpers/filter-languages.pipe';
import { AboutComponent } from './components/about/about.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { LanguageComponent } from './components/language/language.component';
import { LanguageFormComponent } from './components/language-form/language-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FilterLanguagesPipe,
    LanguagesComponent,
    LanguageComponent,
    LanguageFormComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
