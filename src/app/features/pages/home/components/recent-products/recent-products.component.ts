import { map } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../../shared/services/product/products.service';
import { ProductItemComponent } from "../../../../../shared/components/ui/product-item/product-item.component";
import { Product } from '../../../../../shared/interfaces/product';
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../../../../shared/services/wishlist/wishlist.service';
import { Wishlist } from '../../../../../shared/interfaces/wishlist';


@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent ,SearchPipe ,FormsModule],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent implements OnInit  {
  readonly _productsService= inject(ProductsService) ;
  readonly _cartService= inject(CartService) ;
  readonly _toastrService= inject(ToastrService) ;
  readonly _wishlistService= inject(WishlistService) ;
  

  products!: Product[]
  isloading:boolean =true
  searchTerm:string= ""
  isfavourite:boolean =false
  wishlist!:Wishlist
  

 ngOnInit(): void {
   this.getProducts();

   this._wishlistService.getLoggedUserWishlist().subscribe({
    next:(res)=> {
      console.log(res.data,'hellllllo')
      const wishData =res.data.map((item:any)=>item._id)
      console.log(wishData,"wishData")
      this.wishlist = wishData
    },
   })
 }

 getProducts(){
  this._productsService.getProducts().subscribe({
    next :(res)=>{
      this.isloading=false
     console.log(res.data);
     this.products = res.data
    },
    error :(err)=> {
      console.log(err)
    },
    complete(){
      console.log("done")
    }
  })
 }

 addToCart(id:string){
   this._cartService.addProductToCart(id).subscribe({
    next:(res)=> {
      this._toastrService.success(res.message, "done");
      console.log(res)
    },
    error:(err)=>{
      console.log(err)

    }
   })
 }


 addToWishlist(id:string){
  this._wishlistService.addProudctToWishlist(id).subscribe({
   next:(res)=> {
    this._toastrService.success(res.message, "done");
     console.log(res)
     this.wishlist=res.data
     
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
        this.wishlist=res.data

      },
    })
  }

  
  
  
}



 

