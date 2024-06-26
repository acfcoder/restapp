import { Component, inject, effect, signal, computed } from '@angular/core';
import { UserLoginComponent } from '../../users/user.login/user.login.component';
import { AuthStateService } from '../../users/services/auth.state.service';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [UserLoginComponent],
  templateUrl: 'order-confirm.component.html',
  styles: ``
})
export class OrderConfirmComponent {
  private authStateService = inject(AuthStateService);

  logged$ = signal(this.authStateService.logged$());
  userName$ = signal(this.authStateService.userName$());

  constructor() {
    effect(() => {
      this.logged$.set(this.authStateService.logged$());
      this.userName$.set(this.authStateService.userName$());
    }, {allowSignalWrites: true});
  }
}