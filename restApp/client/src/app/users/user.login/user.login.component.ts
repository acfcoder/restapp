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
import { signal } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, RouterLink, UserRegisterComponent
  ],
  templateUrl: 'user.login.component.html',
  styles: ``
})
export class UserLoginComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  toRegister: boolean = false;
  isHidden: boolean = false;
  logged: boolean = false;
  user$ = signal<User | null>(null);
  userName: string | null = null;

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
    console.log('Esta es la response ', response);
  
      if(!response.error){
        localStorage.setItem('access-token', response.token);
        if (response.success === "Login ok") {
          this.logged = true; 
          this.user$.set(response.user);
          this.userName = this.user$()!.name;
        }
      
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
