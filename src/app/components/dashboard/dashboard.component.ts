import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  films: Film[] | null = null;

  constructor(private _film : FilmService) { }

  ngOnInit(): void {
    this.getLastFilms();
  }

  getLastFilms(){
    this._film.getLastFilms().subscribe(
      (res) => {
        this.films = res;
        this.films = this.films.sort((film1, film2) => {
          return (new Date(film2.created_at || '')).getTime() - (new Date(film1.created_at || '')).getTime();
        }).slice(0, 4);
        console.log(this.films)
      }
    );
  }

}
 