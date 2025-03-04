import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment.prod';
import { API_BASE_URL } from '../../../tooken/api-token';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   readonly  _httpClient =inject(HttpClient)
  _baseURL=inject(API_BASE_URL)
  constructor() { }

  getProducts(categoryId?:string): Observable<any>{
    let url =categoryId ? `${this._baseURL}/products?category[in]=${categoryId}` :`${this._baseURL}/products`
    return this._httpClient.get(url)

  }
  getProductBYId(productId:string): Observable<any>{
    return this._httpClient.get(`${this._baseURL}/products/${productId}`)

  }


}
