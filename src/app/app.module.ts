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
import { ModalComponent } from './components/modal/modal.component';
import { LoginFormComponent } from './components/navbar/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { StarComponent } from './components/star/star.component';

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
    NavbarComponent,
    ModalComponent,
    LoginFormComponent,
    UserEditComponent,
    StarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, farSquare, farCheckSquare, faStackOverflow, faGithub, faMedium);
  }
}
