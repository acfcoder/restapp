import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: 'cart-list.component.html',
  styles: ``
})

export class CartListComponent {
  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

}
