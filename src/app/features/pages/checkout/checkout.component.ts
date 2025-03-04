import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{

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

  completeOrderCash(){
    this.isCallingApi=true
    this._orderService.cashOrder(this.cartId,this.checkoutForm.value).subscribe({
      next:(res) =>{
        this.isCallingApi=false
        console.log(res)
        this.checkoutForm.reset()
        
      },
    })

  }
}
