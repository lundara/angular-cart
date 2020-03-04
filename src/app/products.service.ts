import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import * as _ from 'lodash';

import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  product = [];
  private apiUrl = 'api/products';

  httpOptions = {
    headers: new HttpHeaders({ 'ContentType': 'application/json' })
  }

  constructor(
    private http:HttpClient
  ) {}

  allData():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl).pipe();
  }
}
