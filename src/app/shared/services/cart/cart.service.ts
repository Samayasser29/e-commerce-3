import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { API_BASE_URL } from '../../../tooken/api-token';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  _httpClient=inject(HttpClient)
  _baseURL=inject(API_BASE_URL)

  isBrowser!:boolean
  token!:string 

  

  // constructor(@Inject(PLATFORM_ID) private _platformId: Object) {
  //   this.isBrowser= isPlatformBrowser(_platformId)!;
  //   if(this.isBrowser){
  //      this.token = JSON.stringify(localStorage.getItem("userToken")) !
  //   }
  //  }
   
   
  

  addProductToCart(productId:string):Observable<any>{
   return this._httpClient.post(`${this._baseURL}/cart`,{productId})
   
  }

  updateProductQuantity(productId:string,count:string):Observable<any>{
   return this._httpClient.put(`${this._baseURL}/cart/${productId}`,{count}
   )
  }

  getCart():Observable<any>{
   return this._httpClient.get(`${this._baseURL}/cart`
   
  )
  }

  removeSpecificItem(productId:string):Observable<any>{
    return this._httpClient.delete(`${this._baseURL}/cart/${productId}`
     )
   }

   clearCart():Observable<any>{
    return this._httpClient.delete(`${this._baseURL}/cart`
     )
   }



}
