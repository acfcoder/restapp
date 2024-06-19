import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user.register',
  standalone: true,
  imports: [],
  template: `
    <p>
      user.register works!
    </p>
  `,
  styles: ``
})
export class UserRegisterComponent{

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern("^[0-9]\d{9}")]],
    mail: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$")]],
    address: [{
      street_address_1: [''],
      street_address_2: [''],
      zip:[''],
      city:[''],
      country: ['']
    }],
    role: ['customer'],
    newsletter: [false],
  })

  constructor(private fb: FormBuilder) { };

}

