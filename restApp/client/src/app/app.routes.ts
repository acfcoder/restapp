import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/admin/products-list/products-list.component';


export const routes: Routes = [
    { path: '', component: ProductsListComponent, title: 'Product list'}
];
