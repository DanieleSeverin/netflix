import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Genre } from '../models/genre';

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
    let url = 'https://netflix.cristiancarrino.com/genre/create.php';
    return this.http.post(url, body)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  editGenre(body: any){
    let url = 'https://netflix.cristiancarrino.com/genre/update.php';
    return this.http.post(url, body)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }

  removeGenre(body: any){
    let url = 'https://netflix.cristiancarrino.com/genre/delete.php';
    return this.http.post(url, body)
    .pipe(
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return[];
      })
    )
  }
}
