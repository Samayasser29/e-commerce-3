import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../tooken/api-token';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    _baseURL=inject(API_BASE_URL)
  
  private readonly _HttpClient= inject(HttpClient)
  constructor() { }


  cashOrder(id:string ,shippingAddress:{details:string,phone:string,city:string}):Observable<any>{
   return this._HttpClient.post(`${this._baseURL}/orders/${id}`,{shippingAddress}
    )
  }

  getAllOrders():Observable<any>{
    return  this._HttpClient.get(`${this._baseURL}/orders/`)
  }

  getUserOrders(id:string):Observable<any>{
    return  this._HttpClient.get(`${this._baseURL}/orders/user/${id}`)
  }

  onlinePayment(id:string,shippingAddress:{details:string,phone:string,city:string}):Observable<any>{
   return this._HttpClient.post(`${this._baseURL}/orders/checkout-session/${id}?url=http://localhost:4200`,{shippingAddress}
   )
  }

}

