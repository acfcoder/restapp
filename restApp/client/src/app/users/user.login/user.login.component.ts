import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../services/auth.service';
import { UserRegisterComponent } from '../user.register/user.register.component';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, RouterLink, UserRegisterComponent
  ],
  templateUrl: 'user.login.component.html',
  styles: ``
})
export class UserLoginComponent {
  userService = inject(UserService);
  authService = inject(AuthService);
  toRegister: boolean = false;
  isHidden: boolean = false;

  constructor(private fb: FormBuilder){}

  loginForm = this.fb.group ({
    mail:['', Validators.required],
    pass: ['', Validators.required]

  })

  get mail() {
    return this.loginForm.get('mail');
  }

  get pass() {
    return this.loginForm.get('pass');
  }

  async onSubmit() {
    const response = await this.userService.logIn(this.loginForm.value);
    console.log(response)
      if(!response.error){
        localStorage.setItem('access-token', response.token);
      };
  }

  goToLogin() {
    this.toRegister= false;
    setTimeout(()=>{
      this.isHidden = false;
    }, 250 )

  } 

  goToRegister(){
    this.toRegister= true;
    setTimeout(()=>{
      this.isHidden = true;
      console.log('isHidden');
    }, 250 )
  }; 
  


  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
        return 'Este campo es obligatorio';
    }
    return '';
}

}
