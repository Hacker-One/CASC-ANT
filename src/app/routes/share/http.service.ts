import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(protected hc: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }
  /**
  * http post method
  * @param {{}} params
  * @param {string} url
  * @returns {Observable<any>}
  */
  // post(url: string, params: Object = {}): Observable<any> {
  //   return this.hc.post(url, JSON.stringify(params));
  // }

  post(url: string, body: Object = {}): Observable<any> {
    return this.hc.post(url, body)
  }

  /**
   * http get method
   * @param {string} url
   * @returns {Observable<any>}
   */
  get(url: string): Observable<any> {
    return this.hc.get<{}>(url);
  }

  put(url: string, body: Object = {}): Observable<any> {
    return this.hc.put(url, body);
  }


}
