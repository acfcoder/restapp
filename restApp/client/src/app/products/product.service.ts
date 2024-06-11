import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:5300';
  products$ = signal<Product[]>([]);
  product$ = signal<Product>({} as Product);


  constructor(private httpClient: HttpClient) { }

  private refreshProducts() {
    this.httpClient.get<Product[]>(`${this.url}/menu`)
    .subscribe(products => {
      this.products$.set(products)
    });
  }

  getProducts() {
    this.refreshProducts();
    return this.products$()
  }

  getProduct(id: string) {
    this.httpClient.get<Product>(`${this.url}/menu/${id}`)
    .subscribe(product => {
      this.product$.set(product)
      return this.product$()
    })
  }

  createProduct(product: Product) {
    return this.httpClient.post(`${this.url}/admin/products`, product, {responseType: 'text'});
  }

  updateProduct(id: string, product: Product) {
    return this.httpClient.put(`${this.url}/admin/products/${id}`, product, {responseType: 'text'});
  }

  deleteProduct(id: string){
    return this.httpClient.delete(`${this.url}/admin/products/4{id}`, {responseType: 'text'});
  }

}
