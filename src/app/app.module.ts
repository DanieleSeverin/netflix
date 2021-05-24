import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActorAddComponent } from './components/actor-add/actor-add.component';
import { ActorEditComponent } from './components/actor-edit/actor-edit.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmAddComponent } from './components/film-add/film-add.component';
import { FilmEditComponent } from './components/film-edit/film-edit.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { GenreAddComponent } from './components/genre-add/genre-add.component';
import { GenreEditComponent } from './components/genre-edit/genre-edit.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ActorAddComponent,
    ActorEditComponent,
    ActorListComponent,
    DashboardComponent,
    FilmAddComponent,
    FilmEditComponent,
    FilmListComponent,
    GenreAddComponent,
    GenreEditComponent,
    GenreListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
