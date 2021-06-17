import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Actor } from '../models/actor';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  getActors(){
    let url = 'https://netflix.cristiancarrino.com/actor/read.php';
    return this.http.get<Actor[]>(url)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  addActor(body: any){
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

    let url = 'https://netflix.cristiancarrino.com/actor/create.php';
    return this.http.post<any>(url, body, headers)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  editActor(body: any){
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

    let url = 'https://netflix.cristiancarrino.com/actor/update.php';
    return this.http.post<any>(url, body, headers)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  removeActor(body: any){
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

    let url = 'https://netflix.cristiancarrino.com/actor/delete.php';
    return this.http.post<any>(url, body, headers)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }
}
