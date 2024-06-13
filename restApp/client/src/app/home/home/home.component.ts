import { Component } from '@angular/core';
import { FProductsListComponent } from '../../products/front/products-list/products-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FProductsListComponent],
  template: `
    <p>
      home works!
    </p>
    <app-f-products-list></app-f-products-list>
  `,
  styles: ``
})
export class HomeComponent {

}
