import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor';
import { Film } from 'src/app/models/film';
import { ActorService } from 'src/app/services/actor.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  actorList: Actor[] | null = null;
  filmList: Film[] | null = null;

  constructor(private _actor: ActorService, private _film : FilmService) { }

  ngOnInit(): void {
    this.getActors();
  }

  getActors(){
    this._actor.getActors().subscribe(
      (res) => {
        this.actorList = res;
        this.getFilms();
        }
      );
  }

  getFilms(){
    this._film.getFilms().subscribe(
      (res) => {
        this.filmList = res;
        this.getFilmsActors();
        }
      );
  }

  //aggiungi a ogni attore la lista di film a cui ha partecipato
  getFilmsActors(){
    this.actorList!.map( actor => {
      actor.films = [];
      this.filmList?.map( film => {
        film.actors.map( actorFilms => {
          if(actor.id == actorFilms.id){
            actor.films!.push(film);
          }
        });
      });
    })
  }

}
