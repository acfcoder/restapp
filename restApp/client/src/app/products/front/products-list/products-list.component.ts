import { Component, OnInit, computed, WritableSignal, inject, signal } from '@angular/core';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Product } from '../../product';
import { CartService } from '../../../cart/cart.service';
import { IMGS_PRODUCTS_DIR } from '../../../_constants';
import { ProductsSearchComponent } from '../../products-search/products-search.component';


@Component({
  selector: 'app-f-products-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, ProductsSearchComponent],
  templateUrl: 'products-list.component.html',
  styles: '',
})
export class FProductsListComponent implements OnInit {
  errorMessage = '';
  productService = inject(ProductService);
  cartService = inject(CartService);
  imgsProductsDir = IMGS_PRODUCTS_DIR;
  products$ = signal<Product[]>([]);
  
  ngOnInit() {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.products$ = this.productService.products$;
    this.productService.getProducts();
  }

  selectedProduct = this.productService.selectedProduct;

  onSelected(productName: string): void {
    this.productService.productSelected(productName);
  }

  addToCart(product: Product | undefined) {
    if (product) {
      this.cartService.addToCart(product);
    }
  }

}
