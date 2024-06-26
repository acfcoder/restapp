import { Component, inject, effect, signal, computed } from '@angular/core';
import { UserLoginComponent } from '../../users/user.login/user.login.component';
import { AuthStateService } from '../../users/services/auth.state.service';
import { CartTotalComponent } from '../../cart/cart-total/cart-total.component';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [UserLoginComponent, CartTotalComponent, DecimalPipe, MatCheckboxModule, MatIconModule],
  templateUrl: 'order-confirm.component.html',
  styles: ``
})
export class OrderConfirmComponent {
  private authStateService = inject(AuthStateService);
  private orderService = inject(OrderService);


  order$ = signal<Order>(this.orderService.makeOrder());
  logged$ = signal(this.authStateService.logged$());
  userName$ = signal(this.authStateService.userName$());

  constructor(private router: Router) {
    effect(() => {
      this.logged$.set(this.authStateService.logged$());
      this.userName$.set(this.authStateService.userName$());
    }, {allowSignalWrites: true});
  }

  onPay() {
    this.orderService.saveOrder(this.order$()).subscribe(
      response => {
        console.log('Orden guardada exitosamente:', response);
        // Aquí puedes navegar a otra página, mostrar un mensaje de éxito, etc.
      },
      error => {
        console.error('Error al guardar la orden:', error);
        // Aquí puedes manejar el error, mostrar un mensaje, etc.
      }
    );
  }
  

  navigateToCart() {
    this.router.navigate(['/cart'])
  }
  
}