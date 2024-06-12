import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ProductFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Añade un nuevo producto</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-product-form
          (formSubmitted)="addProduct($event)"
        ></app-product-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``
})
export class AddProductComponent {
  constructor(
    private router: Router,
    private productService: ProductService
  ){}

  addProduct(product: Product) {
    console.log ('Esto es al pulsar submit: ',product);

    this.productService.createProduct(product).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create Product');
        console.error(error);
      },
      
    });
    this.productService.getProducts();
  }

}
