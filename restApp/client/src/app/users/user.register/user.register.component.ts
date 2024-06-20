import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user.register',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: 'user.register.component.html',
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

  submitForm() {

    this.formSubmitted.emit(this.productForm.value as Product);
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

