import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthStateService } from '../services/auth.state.service';
import { UserRegisterComponent } from '../user.register/user.register.component';
import { signal } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, RouterLink, UserRegisterComponent, MatIconModule
  ],
  templateUrl: 'user.login.component.html',
  styles: ``
})
export class UserLoginComponent {
  private userService = inject(UserService);
  private authStateService = inject(AuthStateService);
  
  formError: boolean = false;
  toRegister: boolean = false;
  isHidden: boolean = false;
  logged$ = signal<boolean>(this.authStateService.logged$());
  userName$ = signal<string>(this.authStateService.userName$());

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
  
      if(!response.error){
        this.formError = false;
        localStorage.setItem('access-token', response.token);
        if (response.success === "Login ok") {

          this.authStateService.setLoggedIn(true);
          this.logged$.set(this.authStateService.logged$());

          this.authStateService.setName(response.user.name)
          this.userName$.set(this.authStateService.userName$());
          
          this.authStateService.setId(response.user._id);
        }else {
          this.formError = true;
    
      }
  }}

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
