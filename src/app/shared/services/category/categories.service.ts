import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../tooken/api-token';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 _httpClient= inject(HttpClient)
_baseURL=inject(API_BASE_URL)

  constructor() { }

  getAllCategory(): Observable<any>{
    return this._httpClient.get(`${this._baseURL}/categories`)

  }
}
