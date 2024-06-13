import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../product.service';
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

@Component({
  selector: 'app-f-products-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule, MatTabsModule, MatRadioModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: 'products-list.component.html',
  styleUrl: 'products-list.component.scss'
})
export class FProductsListComponent {
  errorMessage = '';
  productService = inject(ProductService);

  products = computed(() => {
    try {
      return this.productService.getProducts();
    } catch (error) {
      this.errorMessage = typeof error === 'string' ? error : 'Error';
      return [];
    }
  });
  selectedProduct = this.productService.selectedProduct;

  onSelected(productName: string): void {
    this.productService.productSelected(productName);
  }
}
