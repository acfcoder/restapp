import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './products/admin/products-list/products-list.component';
import { CommonModule } from '@angular/common';
import { CartService } from './cart/cart.service';

import { httpInterceptorProviders } from './_helpers/http.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsListComponent, RouterLink, RouterLinkActive, CommonModule],
  providers: [httpInterceptorProviders],
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'RestApp';
  cartService = inject(CartService);

  cartCount = computed(() => this.cartService.cartItems().reduce(
    (acc, curr) => {return acc + curr.quantity}, 0));
}
