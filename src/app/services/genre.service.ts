import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Genre } from '../models/genre';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenres(){
    let url = 'https://netflix.cristiancarrino.com/genre/read.php';
    return this.http.get<Genre[]>(url)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  addGenre(body: Genre){
    if(!localStorage.getItem('token')){
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = localStorage.getItem('token')!;

    let headers = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			})
		};
    
    let url = 'https://netflix.cristiancarrino.com/genre/create.php';
    return this.http.post<any>(url, body, headers)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  editGenre(body: any){
    if(!localStorage.getItem('token')){
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = localStorage.getItem('token')!;

    let headers = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			})
		};

    let url = 'https://netflix.cristiancarrino.com/genre/update.php';
    return this.http.post<any>(url, body, headers)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  removeGenre(body: any){
    if(!localStorage.getItem('token')){
      alert("Non sei Loggato");
      return of(null);
    }
    let token: string = localStorage.getItem('token')!;

    let headers = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			})
		};

    let url = 'https://netflix.cristiancarrino.com/genre/delete.php';
    return this.http.post<any>(url, body, headers)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }
}
