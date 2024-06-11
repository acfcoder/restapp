import { Component, WritableSignal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: 'products-list.component.html',
  styles: ``
})
export class ProductsListComponent implements OnInit {
  products$ = {} as WritableSignal<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts()
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.fetchProducts()
    })
  }

  private fetchProducts(): void {
    this.products$ = this.productService.products$;
    this.productService.getProducts();
  }
}
