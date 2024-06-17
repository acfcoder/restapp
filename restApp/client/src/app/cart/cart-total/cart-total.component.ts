import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [],
  templateUrl: 'cart-total.component.html',
  styles: ``
})
export class CartTotalComponent {

  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

  subTotal = this.cartService.subTotal;

  delivery = this.cartService.delivery;

  taxQ = this.cartService.taxQ;

  totalPrice = this.cartService.totalPrice;
}
