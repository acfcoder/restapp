import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/admin/products-list/products-list.component';
import { AddProductComponent } from './products/admin/add-product/add-product.component';


export const routes: Routes = [
    { path: '', component: ProductsListComponent, title: 'Product list'},
    { path: 'new', component: AddProductComponent, title: 'Add Product '}
];
