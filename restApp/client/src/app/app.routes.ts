import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/admin/products-list/products-list.component';
import { AddProductComponent } from './products/admin/add-product/add-product.component';
import { EditProductComponent } from './products/admin/edit-product/edit-product.component';
import { HomeComponent } from './home/home/home.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { OrderConfirmComponent } from './order/order-confirm/order-confirm.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'cart', component: CartListComponent},
    { path: 'confirm', component: OrderConfirmComponent},
    { path: 'products', component: ProductsListComponent, title: 'Product list'},
    { path: 'products/new', component: AddProductComponent, title: 'Add Product'},
    { path: 'products/edit/:id', component: EditProductComponent, title: 'Edit product'},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
