import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { Genre } from 'src/app/models/genre';
import { FilmService } from 'src/app/services/film.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  genreList: Genre[] | null = null;
  filmList: Film[] | null = null;

  constructor(private _genres: GenreService, private _film : FilmService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(){
    this._genres.getGenres().subscribe(
      (res) => {
        this.genreList = res;
        console.log(this.genreList);
        this.getFilms();
        }
      );
  }

  getFilms(){
    this._film.getFilms().subscribe(
      (res) => {
        this.filmList = res;
        this.getFilmsGenres();
        }
      );
  }

  //aggiungi a ogni genere la lista di film che appartengono a quel genere
  getFilmsGenres(){
    this.genreList!.map( genre => {
      genre.films = [];
      this.filmList?.map( film => {
        film.genres.map( genreFilms => {
          if(genre.name == genreFilms.name){
            genre.films!.push(film);
          }
        });
      });
    })
  }

}
