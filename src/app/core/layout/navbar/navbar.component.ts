import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

 
 private readonly _authService=inject(AuthService)
 private readonly _router=inject(Router)
 private readonly _cartService=inject(CartService)
 cartDetails !: Cart
 isLoggedIn:any
   

 constructor(){
  
 }

 ngOnInit(): void {
  this.checkLogginStatus()
  this.getCart()
 }

 checkLogginStatus(){
  this._authService.userData.subscribe({
    next:(res)=>{
      this.isLoggedIn = res
     console.log(res , "hello from nav")
    }
     // console.log(  this._authService.userData.asObservable())
     // console.log(this._authService.userData ,"hello from user data");
  
  })
 }

 signOut(){
  localStorage.removeItem("userToken")
  this._authService.userData.next(null)
  this._router.navigate(['/auth'])
 }

 getCart(){
  this._cartService.getCart().subscribe({
    next:(res)=> {
     this.cartDetails = res 
     console.log(res)
    },
  })
 
 }
 
}
