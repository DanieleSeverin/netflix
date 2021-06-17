import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/app/models/film';
import { User } from 'src/app/models/user';
import { FilmService } from 'src/app/services/film.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lastFilms: Film[] | null = null;
  topFilms: Film[] | null = null;
  actorsString: string = '';
  film!: Film;

  constructor(private _film : FilmService, 
              public _modal: ModalService,
              public _user: UserService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.getLastFilms();
    this.getTopFilms();
  }

  getLastFilms(){
    this._film.getFilms().subscribe(
      (res) => {
        this.lastFilms = res;
        this.lastFilms = this.lastFilms.sort((film1, film2) => {
          return (new Date(film2.created_at || '')).getTime() - (new Date(film1.created_at || '')).getTime();
        }).slice(0, 4);
        console.log(this.lastFilms)
      }
    );
  }

  getTopFilms(){
    this._film.getFilms().subscribe(
      (res) => {
        this.topFilms = res;
        this.topFilms = this.topFilms.sort((film1, film2) => {
          return film2.vote - film1.vote;
        }).slice(0, 4);
        console.log(this.topFilms)
      }
    );
  }
  getActorsString(film: Film) :string{
    let actorsString = '';
    for(let i=0; i<film.actors.length; i++){
      actorsString += film.actors[i].firstname + ' ' + film.actors[i].lastname;
      if(i != film.actors.length-1){
        actorsString += ', ';
      }
    }
    return actorsString;
  }

  getGenresString(film: Film) :string{
    let genresString = '';
    for(let i=0; i<film.genres.length; i++){
      genresString += film.genres[i].name;
      if(i != film.actors.length-1){
        genresString += ', ';
      }
    }
    return genresString;
  }

  showModal(film: Film, event: Event){
    event.preventDefault();
    this.film = film;
    this._modal.showModal();
  }

  editFilm(id:number){
    this.router.navigate(['films/edit/' + id]);
  }

}
 