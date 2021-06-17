import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {

  genre: Genre | null = null;
  id: string = '';
  name: string = '';
  image_url: string | undefined = '';
  isAlertShowing: boolean = false;

  constructor(private _genre : GenreService,
              private router : Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.id = params.id;
      this.getGenre();
    });
  }

  getGenre(){
    this._genre.getGenres().subscribe(
      (res) => {
        let genreList = res;
        genreList.map( genre => {
          if(genre.id == parseInt(this.id)){
            this.genre = genre;
            this.populateVariables();
          }
        });
      }
    );
  }

  populateVariables(){
    this.name = this.genre!.name;
    this.image_url = this.genre!.image_url;
  }

  addGenre(){
    if(!this.name){
      alert("Il nome è obbligatorio!");
      return;
    }

    let body = {
      id : this.id,
      name : this.name,
      image_url : this.image_url
    }

    console.log(body);
    this._genre.editGenre(body).subscribe(
      res => {
        console.log(res);
      }
    )
    this.router.navigate(['genres/list']);
  }

  showAndHideAlert(){
    console.log('showAndHideAlert')
    this.isAlertShowing = !this.isAlertShowing;
  }

  deleteGenre(){
    console.log('delete genre');
    this.showAndHideAlert();

    this._genre.removeGenre({id: parseInt(this.id)}).subscribe(
      res => {
        console.log(res);
      });
    this.router.navigate(['genres/list']);
  }

}
