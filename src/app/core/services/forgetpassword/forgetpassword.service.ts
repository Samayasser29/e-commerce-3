import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  isBrowser!:boolean
  token:string =''
  _authService=inject(AuthService)
  



  constructor(@Inject(PLATFORM_ID) private _platformId: Object) {
      this.isBrowser= isPlatformBrowser(_platformId)!;
      if(this.isBrowser){
         this.token = JSON.stringify(localStorage.getItem("userToken")) !
         console.log(this.token)
      }
     }
     


  private readonly _HttpClient=inject(HttpClient)
  
  forgetPassword(email:string):Observable<any>{
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{email})
  }

  resetCode(resetCode:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{resetCode})
   }
   
   resetNewPassword(email: string, newPassword: string): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , { email, newPassword }
     
    );
  }

}
