import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { Show } from 'src/app/models/show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getShowsByMovieId(id: string,queryParams:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/shows/${id}${queryParams}`,this.httpHeader)
    .pipe(catchError(httpError));
  }

  getShowById(id: string): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/shows/seat-info/${id}`,this.httpHeader)
    .pipe(catchError(httpError));
  }

}

// #FIXME in the respose data not all Show data will be sent. threfore see if a new model is needed to be created for the response data