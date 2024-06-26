import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { CartTotalComponent } from '../cart-total/cart-total.component';
import { MatRadioModule } from '@angular/material/radio'
import { Router } from '@angular/router';
import { OrderService } from '../../order/order.service';
import { CartListComponent } from '../cart-list/cart-list.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart.shell',
  standalone: true,
  imports: [CartListComponent, MatRadioModule, CartTotalComponent, MatIconModule],
  templateUrl: 'cart.shell.component.html',
  styles: ``
})


export class CartShellComponent {
  cartService = inject(CartService);
  orderService = inject(OrderService);

  cartItems = this.cartService.cartItems;

  constructor(private router: Router) {}

  onSubmit() {
    this.onConfirmOptions();
  }

  onConfirmOptions() {
    this.router.navigate(['/confirm']);
    this.orderService.makeOrder();

  }

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
