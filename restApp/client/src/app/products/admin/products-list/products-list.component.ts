import { Component, WritableSignal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs'
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Product } from '../../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule, MatTabsModule, MatRadioModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: 'products-list.component.html' ,
  styles: `

  `
})
export class ProductsListComponent implements OnInit {
  products$ = {} as WritableSignal<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.fetchProducts()
    })
  }

  private fetchProducts(): void {
    this.products$ = this.productService.products$;
    this.productService.getProductsAdmin();
  }
}
