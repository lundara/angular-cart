import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Unit} from './unit';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  units = [];
  private unitsUrl = 'api/units';

  httpOptions = {
    headers: new HttpHeaders({ 'ContentType': 'application/json' })
  }

  constructor(
    private http:HttpClient
  ) {}

  getUnits():Observable<Unit[]>{
    return this.http.get<Unit[]>(this.unitsUrl)
      .pipe(
        tap(_=> console.log('fetched units'))
      );
    //return this.http.get('/assets/units.json');
  }


  addUnit (unit:Unit): Observable<Unit>{

    return this.http.post<Unit>(this.unitsUrl, unit, this.httpOptions)
      .pipe(
        tap((newUnit: Unit) => console.log(`added data`) ),
        catchError(this.handleError<Unit>('addUnit'))
      );
    //console.log(unit);
  }

  deleteUnit(unit: Unit | number): Observable<Unit>{
    const id = typeof unit === 'number' ? unit: unit.id;
    const url = `${this.unitsUrl}/${id}`;

    return this.http.delete<Unit>(url, this.httpOptions).pipe(
      tap(_ => console.log("deleted"))
    );
  }

  updateUnit (unit: Unit): Observable<any>{
    return this.http.put(this.unitsUrl, unit, this.httpOptions).pipe(
      tap(_ => console.log('updated') ),
      catchError(this.handleError<any>('updateUnit'))
    );
  }

  getUnit(id: number): Observable<Unit>{
    const url = `${this.unitsUrl}/${id}`;
    console.log(url);
    return this.http.get<Unit>(url).pipe(

      catchError(this.handleError<Unit>(`getUnit id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
