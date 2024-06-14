import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../products/product';
import { CartItem } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  taxQ = 10;
  cartItems = signal<CartItem[]>([]);

  // Computed line to line
  subTotal = computed(() => this.cartItems().reduce((a, b) => a + (b.quantity * Number(b.product.price)), 0));

  // if the amount is over 60, delivery free
  delivery = computed(() => this.subTotal() < 40 ? 4.5 : 0);

  // Tax computed
  tax = computed(() => Math.round(this.subTotal() * this.taxQ ) / 100);

  // Total price
  totalPrice = computed(() => this.subTotal() + this.delivery() + this.tax()); 

  // Add to cart
  addToCart(product: Product): void {

    const index = this.cartItems().findIndex(item => item.product._id === product._id);

    if (index === -1) {
      this.cartItems.update(items => [...items, {product, quantity: 1}]);
    } else {
      this.cartItems.update(items =>
        [
          ...items.slice(0, index),
          { ...items[index], quantity: items[index].quantity + 1 }, 
          ...items.slice(index + 1)
        ]);
    }
    console.log (this.cartItems());
    console.log (this.totalPrice());
  }

  // Remove the item
  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update( items => items.filter(item => item.product._id !== cartItem.product._id));
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    this.cartItems.update( items => 
      items.map(item => item.product._id === cartItem.product._id ?
        { product: cartItem.product, quantity } : item ));
  }


  constructor() { }
}
