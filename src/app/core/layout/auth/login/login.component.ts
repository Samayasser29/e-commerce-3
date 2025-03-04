import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from "../../../../shared/components/ui/error-message/error-message.component";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessageComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

    apiError !: string 
    subscription:Subscription =new Subscription()
    isCallingApi : boolean =false ;
    timeoutId !:   ReturnType<typeof setTimeout>;
    loginForm !:FormGroup 
    toggleInput !:boolean
    _authService=inject(AuthService)
    _router=inject(Router)




 ngOnInit(){
  this.initForm()
 }

 initForm(){
  this.loginForm =new FormGroup({
    email : new FormControl(null,[Validators.required, Validators.email]),
    password : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),

});
 }



 
  login(){
    console.log(this.loginForm);

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }else{
      this.apiError = ''
      if(!this.isCallingApi){
        this.isCallingApi=true
        this.subscription=this._authService.loginUser(this.loginForm.value).subscribe({
        next:(res)=>{
           console.log(res)
           this.isCallingApi=false
           localStorage.setItem('userToken',res.token)
           this._authService.saveUser()
           this.timeoutId = setTimeout(()=> {
            this._router.navigate(['/home'])
            console.log("done time")
           },1000);

        },error:(err)=>{
          console.log(err)
          this.apiError =err.error.message
          this.isCallingApi=false
        },complete() {
          console.log("done")
        },
      })
      }
     
      this.loginForm.reset();
    }
  }
  ontoggle(){
   this.toggleInput =!this.toggleInput ;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    clearTimeout(this.timeoutId);
  }


  forgetPassword(){
    console.log("hello")
  }

}
