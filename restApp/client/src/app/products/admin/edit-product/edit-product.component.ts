import { Component, WritableSignal } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../../product';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ProductFormComponent,
    MatCardModule 
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Editar product</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-product-form
          [initialState]="product()"
          (formSubmitted)="editProduct($event)"
          (uploadImage)="uploadImage($event)"
        ></app-product-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``
})
export class EditProductComponent {
  product = {} as WritableSignal<Product>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) {
      alert('No id provided');
    }

    this.productService.getProduct(id!);
    this.product = this.productService.product$;
  }

  editProduct(product: Product) {
    this.productService
      .updateProduct(this.product()._id || '', product)
      .subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          alert('Failed to update product');
          console.error(error);
        },
      })
  }

  uploadImage(image: File) {
    console.log ('Esto es lo que pasa con el upload Image: ', image);
    this.productService.updateImageProduct(image).subscribe({
      next: (response) => {
        const filename2 = this.productService.getFileName();
        console.log('Nombre del archivo subido:', filename2);
      },
      error: (error) => {
        console.error('Error al subir la imagen:', error);
      }
    });
  }
}
