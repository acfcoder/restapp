import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/admin/products-list/products-list.component';
import { AddProductComponent } from './products/admin/add-product/add-product.component';
import { EditProductComponent } from './products/admin/edit-product/edit-product.component';
import { HomeComponent } from './home/home/home.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { OrderConfirmComponent } from './order/order-confirm/order-confirm.component';
import { UserRegisterComponent } from './users/user.register/user.register.component';
import { UserLoginComponent } from './users/user.login/user.login.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'cart', component: CartListComponent},
    { path: 'confirm', component: OrderConfirmComponent},
    { path: 'register', component: UserRegisterComponent},
    { path: 'login', component: UserLoginComponent},
    { path: 'admin/products', component: ProductsListComponent, title: 'Product list'},
    { path: 'admin/products/new', component: AddProductComponent, title: 'Add Product'},
    { path: 'admin/products/edit/:id', component: EditProductComponent, title: 'Edit product'},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
