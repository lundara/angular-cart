import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Exam} from './exam';

@Injectable({
  providedIn: 'root'
})

export class ExamsService {

  exams = [];
  private apiUrl = 'api/exams';

  httpOptions = {
    headers: new HttpHeaders({ 'ContentType': 'application/json' })
  }

  constructor(
    private http:HttpClient
  ) {}

  allData():Observable<Exam[]>{
    return this.http.get<Exam[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('data fethced'))
      );
  }


}
