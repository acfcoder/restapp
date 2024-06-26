import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { Order } from './order';
import { inject } from '@angular/core';
import { AuthStateService } from '../users/services/auth.state.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://localhost:5300/api';
  http = inject(HttpClient);
  cartService = inject(CartService);
  authService = inject(AuthStateService);

  constructor() {}

  makeOrder(): Order {
    const cartItems = this.cartService.cartItems();
    const currentDate = new Date();

    // Calcula el precio total del carrito
    const price = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    const tax = price * 0.10;
    const total = price + tax;

    const newOrder: Order = {
      lines: cartItems.map(item => ({
        id: item.product._id!,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      user: this.authService.idUser$(),
      price: this.cartService.subTotal(),
      tax: this.cartService.taxQ(),
      total: this.cartService.totalPrice(),
      date: currentDate,
      status: "waiting",
      paid: false,
      delivered: false,
      deliveredCost: this.cartService.delivery(),
      extra: ''
    };
    console.log(newOrder);
    return newOrder;
  }

  saveOrder(order: Order) {
    console.log ('estoy en el orderService :', order)
    return this.http.post(`${this.url}/admin/orders`, order, {responseType: 'text'});
  }
}
