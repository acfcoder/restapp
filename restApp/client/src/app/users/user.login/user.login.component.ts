import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user.login',
  standalone: true,
  imports: [],
  templateUrl: 'user.login.component.html',
  styles: ``
})
export class UserLoginComponent {
  userService = inject(UserService);


}
