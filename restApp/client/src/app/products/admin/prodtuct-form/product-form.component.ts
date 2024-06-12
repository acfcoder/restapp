import { Component, effect, EventEmitter, input, Output, signal } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Product } from "../../product";

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule
    ],
    styles:``,
    templateUrl: 'product-form.component.html',
})

export class ProductFormComponent {
    initialState = input<Product>();
    newImage: File | undefined;
    imgURl = signal<string>('');
    
    @Output()
    formsValueChanged = new EventEmitter<Product>();

    @Output()
    formSubmitted = new EventEmitter<Product>();

    productForm = this.formBuilder.group({
        name:  ['', [Validators.required, Validators.minLength(3)]],
        desc: ['', [Validators.required, Validators.minLength(5)]],
        l_desc: [''],
        price: [0 , [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})*$")]],
        category: [0],
        img: [''],
        pos: [0, [Validators.pattern("^[0-9]*$")]],
        available: [true],
        time: [0], // preparation time
        excl: [0], // percentage of exclusivity
        allergens: [[0]],
        tags: [['']],
    })

    constructor(private formBuilder: FormBuilder){
        effect(() => {
            this.productForm.setValue({
                name: this.initialState()?.name || '',
                desc: this.initialState()?.desc || '',
                l_desc: this.initialState()?.l_desc || '',
                price: this.initialState()?.price || 0,
                category:  this.initialState()?.category || 0,
                img: this.initialState()?.img || '',
                pos:  this.initialState()?.pos || 0,
                available: this.initialState()?.available || true,
                time: this.initialState()?.time || 0, // preparation time
                excl: this.initialState()?.excl || 0, // percentage of exclusivity
                allergens:  this.initialState()?.allergens || [0],
                tags:  this.initialState()?.tags || [''],
            })
        })
    }

    get name() {
        return this.productForm.get('name');
    }

    get desc() {
        return this.productForm.get('desc');
    }

    get l_desc() {
        return this.productForm.get('l_desc');
    }

    get price() {
        return this.productForm.get('price');
    }

    get category() {
        return this.productForm.get('category');
    }
    get img() {
        return this.productForm.get('img');
    }
    
    get pos() {
        return this.productForm.get('pos');
    }

    get available() {
        return this.productForm.get('available')
    }

    get time() {
        return this.productForm.get('time')
    }

    get excl() {
        return this.productForm.get('excl')
    }

    get allergens() {
        return this.productForm.get('allergens')
    }

    get tags() {
        return this.productForm.get('tags')
    }

    submitForm() {
        this.formSubmitted.emit(this.productForm.value as Product);
    }

    getErrorMessage(controlName: string): string {
        const control = this.productForm.get(controlName);
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

