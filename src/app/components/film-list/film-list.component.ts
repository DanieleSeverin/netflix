import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})

export class FilmListComponent implements OnInit {

  faEdit = faEdit;

  filmList: Film[] | null = null;
  film!: Film;
  search: string | null = null;

  constructor(private _film: FilmService,
              public _user: UserService,
              public _modal: ModalService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(search?: string | null){
    this._film.getFilms().subscribe(
      (res) => {
        this.filmList = res;

        if(search){
          this.filmList = this.searchFilms(this.filmList);
          if(this.filmList == null){ return; }
        }

        this.filmList = this.filmList.sort((film1, film2) => {
          return (new Date(film2.created_at || '')).getTime() - (new Date(film1.created_at || '')).getTime();
        });
      }
    );
  }

  searchFilms(films: Film[]){
    let filmList = [];
    for(let film of films){
      let temp = film.title.search(this.search!);
      if(temp >= 0){
        filmList.push(film);
      }
    }
    return filmList;
  }

  inputBarIsChanged(event: any){
    setTimeout( () => {
      this.getFilms(this.search);
    }, 500);
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

  showModal(film: Film, event: Event){
    event.preventDefault();
    this.film = film;
    this._modal.showModal();
  }

  addFilm(){
    this.router.navigate(['films/add']);
  }

  editFilm(id:number){
    this.router.navigate(['films/edit/' + id]);
  }

}
