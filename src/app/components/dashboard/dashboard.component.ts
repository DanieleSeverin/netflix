import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lastFilms: Film[] | null = null;
  topFilms: Film[] | null = null;

  constructor(private _film : FilmService) { }

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

}
 