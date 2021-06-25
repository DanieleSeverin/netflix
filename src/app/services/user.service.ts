import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: User | null = null;
  isLoginFormOpen: boolean = false;
  id: any = -1;

  constructor(private http: HttpClient) { 
    this.initializeUser();
  }

  login(body: any){
    let url = 'https://netflix.cristiancarrino.com/user/login.php';
    return this.http.post(url, body)
    .pipe(
      tap( res => {
        this.loggedUser = res as User;
        this.id = this.loggedUser?.id || -1;
      }),
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.id = -1;
    this.loggedUser = null;
  }

  editUserinfo(body: any){
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
    
    let url = 'https://netflix.cristiancarrino.com/user/edit.php';
    return this.http.post<any>(url, body, headers)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  getLoggedUser() :User | null {
      let user = localStorage.getItem('user');
      if(user == null){
        return null;
      } else {
          return JSON.parse(user);
      }
  }

  initializeUser(){
    if(localStorage.getItem('user') != null){
      this.loggedUser = JSON.parse(localStorage.getItem('user')!);
      this.id = this.loggedUser!.id;
    }
  }

  async modifyFavourite(body: {ids: string}, route: string){
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
    
    let url = 'https://netflix.cristiancarrino.com/user/' + route + '.php';
    return await this.http.post<any>(url, body, headers).toPromise()
      .catch(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
  }
}
