import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: User | null = null;
  isLoginFormOpen: boolean = false;

  constructor(private http: HttpClient) { 
    if(localStorage.getItem('user') != null){
      this.loggedUser = JSON.parse(localStorage.getItem('user')!);
    }
  }

  login(body: any){
    let url = 'https://netflix.cristiancarrino.com/user/login.php';
    return this.http.post(url, body)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // continua...
  }

  editUserinfo(body: any){
    let url = 'https://netflix.cristiancarrino.com/user/edit.php';
    return this.http.post(url, body)
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
}
