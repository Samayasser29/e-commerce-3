import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../tooken/api-token';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  private readonly _httpClient=inject(HttpClient)
  isBrowser!:boolean
  token!:string 
  _baseURL=inject(API_BASE_URL)
  
  constructor() {
    
     }
     

     addProudctToWishlist(productId:string):Observable<any>{
      return this._httpClient.post(`${this._baseURL}/wishlist`,{productId},
       
      )
     }
    
     getLoggedUserWishlist():Observable<any>{
      return this._httpClient.get(`${this._baseURL}/wishlist`
       )
     }

     deleteProudctFromWishlist(productId:string):Observable<any>{
      return this._httpClient.delete(`${this._baseURL}/wishlist/${productId}`
       
      )
     }
     
    
  

  

}
