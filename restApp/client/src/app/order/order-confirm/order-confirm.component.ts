import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { UserLoginComponent } from '../../users/user.login/user.login.component';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [MatRadioModule, UserLoginComponent],
  templateUrl: 'order-confirm.component.html',
  styles: ``
})
export class OrderConfirmComponent {

}
