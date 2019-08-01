import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params });
  }

  post(path: string, body?: any): Observable<any> {
    return this.http.post(path, body);
  }

}
