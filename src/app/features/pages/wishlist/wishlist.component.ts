import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { RouterLink } from '@angular/router';
import { Product } from '../../../shared/interfaces/cart';
import { Wishlist } from '../../../shared/interfaces/wishlist';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  
  private readonly _wishlistService=inject(WishlistService)
  private readonly _cartService=inject(CartService)
  private readonly _toastrService=inject(ToastrService)
  
  isLoading:boolean = true
  emptyCart:boolean =false
  wishlistDetails !: any
  products!: Wishlist[];
  productDetails!:Product
  
  
  


  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=> {
        this.isLoading=false
       this.products = res.data 
       console.log(this.products)
      },
    })
   
   }

   addToCart(id:string){
    this._cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this._toastrService.success(res.message, "done");
        console.log(res)
        this.productDetails =res
        this.removeFromWishlist(id)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  removeFromWishlist(productId:string){
    this._wishlistService.deleteProudctFromWishlist(productId).subscribe({
      next:(res)=> {
        console.log(res)

        this.wishlistDetails = res.data
        const newProduct = this.products.filter((item:any)=>
          this.wishlistDetails.includes(item._id)
        );
        this.products= newProduct

      },
    })
  }
  


}
