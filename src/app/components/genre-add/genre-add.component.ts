import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.css']
})
export class GenreAddComponent implements OnInit {

  name: string = '';
  image_url: string = '';

  constructor(private _genre : GenreService,
              private router : Router) { }

  ngOnInit(): void {
  }

  addGenre(){
    if(!this.name){
      alert("Il nome è obbligatorio!");
      return;
    }

    let body = {
      name : this.name,
      image_url : this.image_url
    }

    console.log(body);
    this._genre.addGenre(body).subscribe(
      res => {
        console.log(res);
      }
    )
    this.router.navigate(['genres/list']);
  }

}
