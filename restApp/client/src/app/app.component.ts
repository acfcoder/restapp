import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './products/admin/products-list/products-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsListComponent],
  template: `
    <h1 class="display-1">Welcome to {{title}}!</h1>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'RestApp';
}
