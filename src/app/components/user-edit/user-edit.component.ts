import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Film } from 'src/app/models/film';
import { Genre } from 'src/app/models/genre';
import { User } from 'src/app/models/user';
import { ActorService } from 'src/app/services/actor.service';
import { FilmService } from 'src/app/services/film.service';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  birthdate: Date | undefined = undefined;
  photo_url: string = '';
  user: User;
  actorList: Actor[] | null = null;
  filmList: Film[] | null = null;
  genreList: Genre[] | null = null;
  selectedActor: string = '';
  selectedActors: string[] = [];
  selectedActorList: Actor[] = [];
  selectedGenre: string = '';
  selectedGenres: string[] = [];
  selectedGenreList: Genre[] = [];
  selectedFilm: string = '';
  selectedFilms: string[] = [];
  selectedFilmsList: Film[] = [];

  constructor(private _genres: GenreService, 
              private _user: UserService,
              private _actor: ActorService,
              private _film: FilmService,
              private router: Router) { 
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
    this.getGenres();
    this.getActors();
    this.getFilms();
    //this.populateVariables(); <- l'ho messa alla fine di getFilms 
    console.log('ngOnInit')
    console.log(this.selectedActorList);
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

  getFilms(){
    this._film.getFilms().subscribe(
      (res) => {
        this.filmList = res;
        this.populateVariables();
        }
      );
  }

//Film Input
filmIsChanged(filmName: string){
  console.log('filmIsChanged');
  console.log(filmName);
  if(!this.selectedFilms.includes(filmName) && filmName != 'Scegli...'){
    this.selectedFilms.push(filmName);
    this.addFilmObj(filmName)
  }
}

addFilmObj(filmName: string){

  filmName = filmName.trim();

  this.filmList!.map ( film => {
    if(film.title.trim() == filmName){
      this.selectedFilmsList.push(film);
      console.log('addFilmObj')
      console.log(this.selectedFilmsList);
      return;
    }
  })
}

removeFilm(film: string){
  const index = this.selectedFilms.indexOf(film);
  if (index > -1) {
    this.selectedFilms.splice(index, 1);
  }
  this.removeFilmObj(film);
}

removeFilmObj(filmName: string){
  filmName = filmName.trim();
  let i = 0;

  this.selectedFilmsList.map ( film => {
    if(film.title.trim() == filmName){
      this.selectedFilmsList.splice(i, 1);
      console.log('removeFilmObj')
      console.log(this.selectedFilmsList);
      return;
      }
    i++;
  });
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

  populateVariables(){
    this.username = this.user.username;
    this.password = this.user.password;
    this.firstname = this.user.firstname || '';
    this.lastname = this.user.lastname || '';
    this.birthdate = this.user.birthdate || undefined;
    this.photo_url = this.user.photo_url || '';

    if(this.user.favorite_films){
      this.user.favorite_films.map(x => {
        this.filmList?.map( y => {
          if(x == y.id){
            this.selectedFilms.push(y.title);
          }
        })

        })
    }

    if(this.user.favorite_actors){
      this.user.favorite_actors.map(x => {
        this.actorList?.map( y => {
          if(x == y.id){
            this.selectedActors.push(y.firstname + ' ' + y.lastname);
          }
        })
      });
    }

    if(this.user.favorite_genres){
      this.user.favorite_genres.map(x => {
        this.genreList?.map( y => {
          if(x == y.id){
            this.selectedGenres.push(y.name);
          }
        })
      })
    }
  }

  editUser(){
    console.log('edit user');

    let body: {username?: string, 
              password?: string, 
              firstname?: string, 
              lastname?: string, 
              photo_url?: string, 
              birthdate?: Date | undefined,
              favorite_actors?: {id: number}[] | null
              } = {};

    if(this.username != '')
      body.username = this.username;
    if(this.password != '')
      body.password = this.password;
    if(this.firstname != '')
      body.firstname = this.firstname;
    if(this.lastname != '')
      body.lastname = this.lastname;
    if(this.photo_url != '')
      body.photo_url = this.photo_url;
    if(this.birthdate != undefined)
      body.birthdate = this.birthdate;

    let filmsId = this.getFilmsId();
    let actorsId = this.getActorsId();
    let genresId = this.getGenresId();

      this._user.modifyFavourite(filmsId, 'favorite-films').subscribe(
        res =>{
          console.log('risposta server modifica film: ')
          console.log(res);
        }
      );

      this._user.modifyFavourite(actorsId, 'favorite-actors').subscribe(
        res =>{
          console.log(res);
        }
      );

      this._user.modifyFavourite(genresId, 'favorite-genres').subscribe(
        res =>{
          console.log(res);
        }
      );

    this._user.editUserinfo(body).subscribe(
      res => {
        console.log(res);

        let user = this.normalizeFavouritesInput(res);

        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['dashboard']);
      }
    )
  }

  normalizeFavouritesInput(res: any) :User{
    if(res.favorite_films){
      let favorite_films = res.favorite_films.split(',');
      let arr :number[] = [];
      favorite_films.map( (x: string) => {
        arr.push(parseInt(x));
      })
      res.favorite_films = arr;
    }

    if(res.favorite_actors){
      let favorite_actors = res.favorite_actors.split(',');
      let arr2 :number[] = [];
      favorite_actors.map( (x: string) => {
        arr2.push(parseInt(x));
      })
      res.favorite_actors = arr2;
    }

    if(res.favorite_genres){
      let favorite_genres = res.favorite_genres.split(',');
      let arr3 :number[] = [];
      favorite_genres.map( (x: string) => {
        arr3.push(parseInt(x));
      })
      res.favorite_genres = arr3;
    }


    return res;
  }

  getFilmsId(){
    let obj : {ids: string} = {ids: ''};
    console.log('in getFilmsId')
    console.log(this.selectedFilmsList)
    this.selectedFilmsList.map( x => {
      obj.ids += x.id + ',';
    })
    obj.ids = obj.ids.slice(0, -1);
    console.log(obj)
    return obj;
  }

  getActorsId(){
    let obj : {ids: string} = {ids: ''};
    this.selectedActorList.map( x => {
      obj.ids += x.id + ',';
    })
    obj.ids = obj.ids.slice(0, -1);
    console.log(obj)
    return obj;
  }

  getGenresId(){
    let obj : {ids: string} = {ids: ''};
    this.selectedGenreList.map( x => {
      obj.ids += x.id + ',';
    })
    obj.ids = obj.ids.slice(0, -1);
    console.log(obj)
    return obj;
  }
}
