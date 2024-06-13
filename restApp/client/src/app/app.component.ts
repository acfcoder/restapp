import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './products/admin/products-list/products-list.component';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsListComponent, RouterLink, RouterLinkActive],
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'RestApp';
  cartService = inject(CartService);

  /*
  cartCount = computed(() => this.cartService.cartItems().reduce(
    (acc, item) => acc = item.quantity, 0));
  */
}
