import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Actor } from 'src/app/models/actor';
import { Genre } from 'src/app/models/genre';
import { ActorService } from 'src/app/services/actor.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css']
})
export class FilmAddComponent implements OnInit {

  title: string = '';
  director: string = '';
  description: string = '';
  plot: string = '';
  duration: string = '';
  vote: string = '';
  release_year: string = '';
  tags: string = '';
  actorList: Actor[] | null = null;
  genreList: Genre[] | null = null;
  selectedActor: string = '';
  selectedActors: string[] = [];
  selectedActorList: Actor[] = [];
  selectedGenre: string = '';
  selectedGenres: string[] = [];
  selectedGenreList: Genre[] = [];
  selectedTags: string[] = [];
  cover_url: string = '';

  constructor(private _genres: GenreService, 
              private _actor: ActorService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.getGenres();
    this.getActors();
  }

  getGenres(){
    this._genres.getGenres().subscribe(
      (res) => {
        this.genreList = res;
        }
      );
  }

  getActors(){
    this._actor.getActors().subscribe(
      (res) => {
        this.actorList = res;
        }
      );
  }

// Actors Input
  actorIsChanged(actorName: string){
    console.log('actorIsChanged');
    console.log(actorName);
    if(!this.selectedActors.includes(actorName) && actorName != 'Scegli...'){
      this.selectedActors.push(actorName);
      this.addActorObj(actorName)
    }
  }

  addActorObj(actorName: string){
    let arr = actorName.split(" ");
    let firstName = arr[0].trim();
    let lastName = arr[1].trim();

    this.actorList!.map ( actor => {
      if(actor.firstname.trim() == firstName && actor.lastname.trim() == lastName){
        this.selectedActorList.push(actor);
        console.log(this.selectedActorList);
        return;
      }
    })
  }

  removeActor(actor: string){
    console.log('remove actor: ' + actor);
    const index = this.selectedActors.indexOf(actor);
    if (index > -1) {
      this.selectedActors.splice(index, 1);
    }
    console.log(this.selectedActors); 
    this.removeActorObj(actor);
  }

  removeActorObj(actorName: string){
    actorName.trim();
    let arr = actorName.split(" ");
    let firstName = arr[0].trim();
    let lastName = arr[1].trim();
    let i=0;

    this.selectedActorList.map ( actor => {
      if(actor.firstname.trim() == firstName && actor.lastname.trim() == lastName){
        console.log('index i: ' + i)
        this.selectedActorList.splice(i, 1);
        console.log(this.selectedActorList);
        return;
        }
      i++;
    });
  }

//Genre Input
genreIsChanged(genreName: string){
  console.log('genreIsChanged');
  console.log(genreName);
  if(!this.selectedGenres.includes(genreName) && genreName != 'Scegli...'){
    this.selectedGenres.push(genreName);
    this.addGenreObj(genreName)
  }
}

addGenreObj(genreName: string){

  genreName = genreName.trim();

  this.genreList!.map ( genre => {
    if(genre.name.trim() == genreName){
      this.selectedGenreList.push(genre);
      console.log(this.selectedGenreList);
      return;
    }
  })
}

removeGenre(genre: string){
  console.log('remove genre: ' + genre);
  const index = this.selectedGenres.indexOf(genre);
  if (index > -1) {
    this.selectedGenres.splice(index, 1);
  }
  console.log(this.selectedGenres); 
  this.removeGenreObj(genre);
}

removeGenreObj(genreName: string){
  genreName = genreName.trim();
  let i = 0;

  this.selectedGenreList.map ( genre => {
    if(genre.name.trim() == genreName){
      this.selectedGenreList.splice(i, 1);
      console.log(this.selectedGenreList);
      return;
      }
    i++;
  });
}

//Tags Input
tagIsChanged(event: string){
  this.tags = event;
  let arr: string[] = [];
  this.selectedTags = event.split(",");
  this.selectedTags.map( x => {
    x.trim();
    if(x != '' && x != ' ')
      arr.push(x);
    this.selectedTags = arr;
  });
}

removeTag(tag: string){
  let arr: string[] = [];
  let str: string = '';
  this.selectedTags.map( x => {
    if(x != tag){
      arr.push(x);
      str += x.trim() + ', ';
    }
  })
  this.selectedTags = arr;
  this.tags = str;
}

//Add Film Button
  addFilm(){
    console.log('add film');
    console.log(this.selectedActorList);

    if(!(this.title && this.description && this.plot && this.director && this.duration && this.vote && this.release_year && this.cover_url && this.tags && this.selectedActorList.length > 0 && this.selectedGenreList.length > 0)){
      alert("Tutti i campi sono obbligatori!");
      return;
    }

    let actorsId = this.getActorsId();
    let genresId = this.getGenresId();

    let year = new Date(this.release_year).getFullYear();

    let body = {
      "title": this.title,
      "description": this.description,
      "plot": this.plot,
      "director": this.director,
      "duration": this.duration,
      "vote": this.vote as unknown as number,
      "release_year": year,
      "cover_url": this.cover_url,
      "tags": this.tags,
      "actors": actorsId,
      "genres": genresId
    }

    console.log(body); //ancora non fa la chiamata
    //this.router.navigate(['films/list']);
  }

  getActorsId(){
    let arr: {id: number}[] = []
    this.selectedActorList.map( x => {
      arr.push({id: x.id});
    })
    return arr;
  }

  getGenresId(){
    let arr: {id: number | undefined}[] = []
    this.selectedGenreList.map( x => {
      arr.push({id: x.id});
    })
    return arr;
  }

}
