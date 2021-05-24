import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Film } from '../models/film';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  getFilms(){
    let url = 'https://netflix.cristiancarrino.com/film/read.php';
    return this.http.get(url)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  addFilms(body: Film){
    let url = 'https://netflix.cristiancarrino.com/film/create.php';
    return this.http.post(url, body)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  editFilms(body: any){
    let url = 'https://netflix.cristiancarrino.com/film/update.php';
    return this.http.post(url, body)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  removeFilms(body: any){
    let url = 'https://netflix.cristiancarrino.com/film/delete.php';
    return this.http.post(url, body)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  getLastFilms(): Observable<Film[]>{
    let url = 'https://netflix.cristiancarrino.com/film/read.php';
    return this.http.get<Film[]>(url)
    .pipe(
      tap(),
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )

  }

  getTopFilms(){
    this.getFilms().subscribe(
      (res) => {
        //to do sort function
      }
    )
  }



}
