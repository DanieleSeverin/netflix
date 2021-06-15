import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  actorList: Actor[] | null = null;

  constructor(private _actor: ActorService) { }

  ngOnInit(): void {
    this.getActors();
  }

  getActors(){
    this._actor.getActors().subscribe(
      (res) => {
        this.actorList = res;
        }
      );
  }

}
