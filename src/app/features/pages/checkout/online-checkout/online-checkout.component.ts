import { Component, inject, OnInit } from '@angular/core';
import { ErrorMessageComponent } from "../../../../shared/components/ui/error-message/error-message.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../shared/services/order/order.service';

@Component({
  selector: 'app-online-checkout',
  imports: [ReactiveFormsModule,ErrorMessageComponent],
  templateUrl: './online-checkout.component.html',
  styleUrl: './online-checkout.component.scss'
})
export class OnlineCheckoutComponent implements OnInit {
  private readonly _activatedRoute=inject(ActivatedRoute)
   private readonly _orderService=inject(OrderService)
 
   checkoutForm!:FormGroup
   isCallingApi:boolean = false
   cartId!:string
   ngOnInit(): void {
     this.getCartId()
     this.initForm()
   }
 
   getCartId(){
    this.cartId =this._activatedRoute.snapshot.params['cartId']
   }
 
   initForm(){
     this.checkoutForm = new FormGroup({
       address: new FormControl(null ,[Validators.required]),
       city: new FormControl(null ,[Validators.required]),
       phone: new FormControl(null ,[Validators.required])
     })
   }
 
   completeOrderOnline(){
     this.isCallingApi=true
     this._orderService.onlinePayment(this.cartId,this.checkoutForm.value).subscribe({
       next:(res) =>{
         this.isCallingApi=false
         console.log(res.session.url)
         open(res.session.url)
         this.checkoutForm.reset()
         
       },
     })
 
   }
}
