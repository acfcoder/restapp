import { Component, inject, Input, signal, computed } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { CartItem } from '../cart';
import { MAX_QTY } from '../../_constants';
import { IMGS_PRODUCTS_DIR } from '../../_constants';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [DecimalPipe, FormsModule, CommonModule],
  templateUrl: 'cart-item.component.html',
  styles: ``
}) 

export class CartItemComponent {
  cartService = inject(CartService);
  isRemove: boolean = false;

  private _item!: CartItem;
  get item(): CartItem {
    return this._item;
  }
  @Input() set item(item: CartItem) {
    this._item = item;
    this.cartItem.set(item)
  }

  errMessage: string = '';
  showErrMessage: boolean = false;
  
  qtyArray = signal([1, 2, 3, 4, 5, 6]);

  cartItem = signal(this.item);
  
  // Constants
  maxQty: number = MAX_QTY;
  urlProductImgs: string = IMGS_PRODUCTS_DIR;


  exPrice = computed(() => 
    this.cartItem().quantity * Number(this.cartItem().product.price));

  plusQty() {
      let newQty = this.cartItem().quantity + 1;
      this.cartService.updateInCart(this.cartItem(), Number(newQty));
  }

  minusQty() {
      let newQty = this.cartItem().quantity - 1;
      this.cartService.updateInCart(this.cartItem(), Number(newQty));
  }

  onRemove(): void {
    this.isRemove = true;
    setTimeout (
      () =>  {this.cartService.removeFromCart(this.cartItem())}, 300);
  } 

  

}