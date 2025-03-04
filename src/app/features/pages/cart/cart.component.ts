import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {
  
  private readonly _cartService=inject(CartService)
  cartDetails !: Cart 
  isLoading:boolean = true
  emptyCart:boolean =false



 ngOnInit(): void {
   this.getCart()
 }


 getCart(){
  this._cartService.getCart().subscribe({
    next:(res)=> {
      this.isLoading=false
     this.cartDetails = res 
     console.log(res)
    },
  })
 
 }

 removeItem(id:string){
  this.isLoading=true
  this._cartService.removeSpecificItem(id).subscribe({
    next:(res)=> {
      console.log(res)
      this.isLoading = false
      this.cartDetails =res
    },
  })
 }
 
 
 updateCount(id:string,count:number){
  this.isLoading=true
  this._cartService.updateProductQuantity(id,`${count}`).subscribe({
    next:(res)=> {
      console.log(res)
      this.isLoading=false
      this.cartDetails =res

    },
  })
 }

 clearCart(){
  this.isLoading= true
  this._cartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res)
      this.isLoading=false
      if(res.message=="success"){
        this.cartDetails = {} as Cart
        this.emptyCart=true
      }

    },error:(err)=>{
      
    }
  })
 }
}
