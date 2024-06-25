import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule],
  templateUrl: 'user.register.component.html',
  styles: ``
})

export class UserRegisterComponent {

  userService = inject(UserService);

  constructor(private fb: FormBuilder) { };


  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', Validators.required],
    mail: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$")]],
    address: [{
      street_address_1: [''],
      street_address_2: [''],
      zip:[''],
      city:[''],
      country: ['']
    }],
    role: 'customer',
    newsletter: false
  })



  get name() {
    return this.registerForm.get('name');
  }

  get mail() {
    return this.registerForm.get('mail');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get pass() {
    return this.registerForm.get('pass');
  } 
  

  async onSubmit() {
    const response =  await this.userService.register(this.registerForm.value);
  }

  getErrorMessage(controlName: string): string {
      const control = this.registerForm.get(controlName);
      if (control?.hasError('required')) {
          return 'Este campo es obligatorio';
      }
      if (control?.hasError('minlength')) {
          return `Debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
      }
      if (control?.hasError('pattern')) {
          return 'Formato no válido';
      }
      return '';
  }
}

