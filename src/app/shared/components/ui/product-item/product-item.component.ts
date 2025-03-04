import { Wishlist } from './../../../interfaces/wishlist';
import { RouterLink } from '@angular/router';
import { Product } from './../../../interfaces/product'
import { Component,  EventEmitter,  Input,  Output } from '@angular/core';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
@Input() product!: Product;
@Input() Wishlist!:Wishlist
@Input()  isfavourite!:boolean
@Output() fireAddToCart : EventEmitter<string> = new EventEmitter()
@Output() fireAddToWishlist : EventEmitter<string> = new EventEmitter()
@Output() fireRemoveWishlist : EventEmitter<string> = new EventEmitter()



handleAddToCart(id:string){
  this.fireAddToCart.emit(id)
}
handleAddToWishlist(id:string){
  this.fireAddToWishlist.emit(id)
  this.isfavourite=true

}
handleRemoveFromWishlist(id:string){
  this.fireRemoveWishlist.emit(id)
  this.isfavourite=false

}





}
