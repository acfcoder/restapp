import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartTotalComponent } from '../cart-total/cart-total.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, CartItemComponent, CartTotalComponent],
  templateUrl: 'cart-list.component.html',
  styles: ``
})

export class CartListComponent {
  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

  constructor(private router: Router) {}

  navigateToHome(value: boolean) {
    if(value) {
        this.cartItems.set([]);
    };
    this.router.navigate(['/home']);
  }

  navigateToConfirm() {
    this.router.navigate(['/confirm'])
  }

}
