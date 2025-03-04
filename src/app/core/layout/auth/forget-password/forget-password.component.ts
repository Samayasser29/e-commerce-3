import { Router } from '@angular/router';
import { ForgetpasswordService } from './../../../services/forgetpassword/forgetpassword.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  currentStep = 1;
  emailForm!: FormGroup;
  codeForm!: FormGroup;
  passwordForm!: FormGroup ;

  private readonly _formBuilder=inject(FormBuilder)
  private readonly _forgetpasswordService=inject(ForgetpasswordService)
  private readonly _router=inject(Router)
  
  constructor(){
    this.emailForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  
    this.codeForm = this._formBuilder.group({
      resetCode: ['', [Validators.required, Validators.minLength(6)]]
    });
  
    this.passwordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.pattern(/^[A-Z]\w{5,}$/)]],
      
    });
  }

   /** Step 1: Send Email */
   sendEmail() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this._forgetpasswordService.forgetPassword(email).subscribe({
        next: (res) => {
          console.log('Email sent:', res);
          this.currentStep = 2; // Move to next step
        },
        error: (err) => console.error('Error sending email:', err)
      });
    }
  }


  verifyCode() {
    
    if (this.codeForm.valid) {
      const resetCode = this.codeForm.value.resetCode;
      this. _forgetpasswordService.resetCode(resetCode).subscribe({
        next: (res) => {
          console.log('Code Verified:', res);
          this.currentStep = 3; // Move to next step
        },
        error: (err) => console.error('Invalid code:', err)
      });
    }
  }

  resetPassword() {
    if (this.passwordForm.invalid) return;
    const {email, newPassword } = this.passwordForm.value;
    this._forgetpasswordService.resetNewPassword(email,newPassword).subscribe({
      next: (res) => {
        console.log( res);  
        alert('Password reset successful! Redirecting to login page...');
        
        this._router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('Error resetting password:', err); 
        alert(`Failed to reset password: ${err.error?.message || 'Unknown error'}`);
        
      }
    });
  }
  

}
