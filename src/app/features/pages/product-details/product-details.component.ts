import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/product/products.service';
import {  Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, ProductItemComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

 private readonly _activatedRoute=inject(ActivatedRoute)
 private readonly _productsService=inject(ProductsService)
 private readonly _toastrService=inject(ToastrService)
 private readonly _WishlistService=inject(WishlistService)

 private readonly _cartService=inject(CartService)
 isLoading:boolean =false
 productDetails!:Product
 recentProducts!: Product[]
 APIError !:string
 wishlist:string =''


  ngOnInit(): void {
   this.getId() 

   this._WishlistService.getLoggedUserWishlist().subscribe({
    next:(res)=> {
      console.log(res.data,'hellllllo')
      const wishData =res.data.map((item:any)=>item._id)
      console.log(wishData,"wishData")
      this.wishlist = wishData
    },
   })
  }

   CustomOptions: OwlOptions = {
       loop: true,
       mouseDrag: false,
       touchDrag: false,
       pullDrag: false,
       dots: false,
       navSpeed: 700,
       navText: ['', ''],
       responsive: {
         0: {
           items: 1
         }
       },
       nav: true
     };

  getId(){
    this._activatedRoute.paramMap.subscribe({
      next:(res:any)=>{
        const productId =res?.params?.id ;
        console.log(productId)
        this.getDetails(productId)
      }
    }
    ) 
  }

  getDetails(productId:string){
    this._productsService.getProductBYId(productId).subscribe({
      next:(res)=>{
        this.productDetails =res.data
        console.log(res)
        this.getRelatedProducts(this.productDetails.category._id)

      
      },
      error:(err)=> {
        console.log(err)
        this.APIError =err.error.message
        
      },
    })
  }

  getRelatedProducts(categoryId:string){
    this._productsService.getProducts(categoryId).subscribe({
      next:(res)=> {
        console.log(res)
        this.recentProducts=res.data

        
      },
    })
  }

  addToCart(id:string){
    this.isLoading=true
    this._cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this.isLoading=false
        this._toastrService.success(res.message, "done");
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addToWishlist(id:string){
    this._WishlistService.addProudctToWishlist(id).subscribe({
      next:(res)=>{
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
    this._WishlistService.deleteProudctFromWishlist(productId).subscribe({
      next:(res)=> {
        console.log(res)
      },
    })
  }

   
  
}
