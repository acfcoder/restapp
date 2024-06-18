import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../products/product';
import { CartItem } from './cart';
import { FREE_DELIVERY, MAX_QTY, TAX } from '../_constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);

  // Constants
  maxQty: number = MAX_QTY;
  freeDelivery: number = FREE_DELIVERY;
  tax: number = TAX;

  // Computed line to line
  subTotal = computed(() => this.cartItems().reduce((a, b) => a + (b.quantity * Number(b.product.price)), 0));

  // if the amount is over 60, delivery free
  delivery = computed(() => this.subTotal() < this.freeDelivery ? 4.5 : 0);

  // Tax computed
  taxQ = computed(() => Math.round(this.subTotal() * this.tax ) / 100);

  // Total price
  totalPrice = computed(() => this.subTotal() + this.delivery() + this.tax); 

  // Add to cart
  addToCart(product: Product): void {

    const index = this.cartItems().findIndex(item => item.product._id === product._id);

    if (index === -1) {
      this.cartItems.update(items => [...items, {product, quantity: 1}]);
    } else {
      if (this.cartItems()[index].quantity < this.maxQty) {
      this.cartItems.update(items =>
              [
                ...items.slice(0, index),
                { ...items[index], quantity: items[index].quantity + 1 }, 
                ...items.slice(index + 1)
              ]);
      } else {
        alert ('No puedes elegir mas de 8 unidades de un solo producto.');
      }
    }
  }

  // Remove the item
  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update( items => items.filter(item => item.product._id !== cartItem.product._id));
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    if (quantity < this.maxQty + 1 && quantity > 0) {
        this.cartItems.update( items => 
        items.map(item => item.product._id === cartItem.product._id ?
        { product: cartItem.product, quantity } : item ));
      }
  }

  constructor() { }
}
