import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Film } from '../models/film';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  getFilms(){
    let url = 'https://netflix.cristiancarrino.com/film/read.php';
    return this.http.get<Film[]>(url)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  addFilms(body: any){

    if(!localStorage.getItem('token')){
      alert("Non sei Loggato");
      return of(null);
    }

    let url = 'https://netflix.cristiancarrino.com/film/create.php';

    let token: string = localStorage.getItem('token')!;

    let headers = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			})
		};

    return this.http.post<any>(url, body, headers)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  editFilms(body: any){

    if(!localStorage.getItem('token')){
      alert("Non sei Loggato");
      return of(null);
    }

    let url = 'https://netflix.cristiancarrino.com/film/update.php';

    let token: string = localStorage.getItem('token')!;

    let headers = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			})
		};

    return this.http.post<any>(url, body, headers)
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



}
