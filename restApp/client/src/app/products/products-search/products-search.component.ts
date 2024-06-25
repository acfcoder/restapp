import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-search',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule],
  template: `
    <form class="search-bar" >
      <mat-form-field  appearance="outline"  class="col-10 col-md-2">
          <mat-label>Buscar</mat-label>
          <input matInput (input)="onSearch($event)" [(ngModel)]=" searchTerm"  [ngModelOptions]="{standalone: true}"/>
          <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
      <div class="cart-icon" style="margin-top: 0.5rem">
        <mat-icon (click)="onErase()">close</mat-icon>
      </div>
    </form>  
  `,
  styles: ``
})



export class ProductsSearchComponent {
  
  searchTerm: string = '';

  private productService = inject(ProductService);

  onSearch(event: Event) :void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.productService.setSearchTerm(this.searchTerm);
  }

  onErase(): void{
    this.searchTerm = '';
    this.productService.setSearchTerm(this.searchTerm);
    console.log(this.searchTerm);
    console.log ('hello');
  }
}
