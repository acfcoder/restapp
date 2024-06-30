import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [],
  template: `
    <div class="container total">
    <div class="cover">
            <img class="cover__img" src="../../../assets/icons/fire-mask.png" alt="">
            <h2 class="handwrite">¡Oído Cocina!</h2>
            <h3 class="handwrite mini">Encendemos el fuego</h3>
          
    </div>
    </div> 
    <div class="container cart__options">
      <h3>En unos 30 minutos tendrás tu pedido</h3>
    </div>  
  `,
  styles: ``
})
export class OrderSuccessComponent implements OnInit {
  private _cartService = inject(CartService);

  ngOnInit(): void {
    this._cartService.cartItems.set([]);
  }

}
