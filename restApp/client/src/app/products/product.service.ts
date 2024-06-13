import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:5300';
  http = inject(HttpClient);
  products$ = signal<Product[]>([]);
  product$ = signal<Product>({} as Product);

  fileNameSubject$ = signal<string>('');

  selectedProduct= signal<Product | undefined>(undefined);
  

  constructor(private httpClient: HttpClient) { }

  private refreshProducts() {
    this.httpClient.get<Product[]>(`${this.url}/products`)
    .subscribe(products => {
      this.products$.set(products)
    });
  }

  getProducts() {
    this.refreshProducts();
    return this.products$()
  }

  getProduct(id: string) {
    this.httpClient.get<Product>(`${this.url}/products/${id}`)
    .subscribe(product => {
      this.product$.set(product)
      return this.product$()
    })
  }

  productSelected(productId: string) {
    const foundProduct = this.products$().find((p) => p._id === productId);
    this.selectedProduct.set(foundProduct);
  }


  createProduct(product: Product) {
    return this.httpClient.post(`${this.url}/admin/products`, product, {responseType: 'text'});
  }

  updateProduct(id: string, product: Product) {
    return this.httpClient.put(`${this.url}/admin/products/${id}`, product, {responseType: 'text'});
  }

  deleteProduct(id: string){
    return this.httpClient.delete(`${this.url}/admin/products/${id}`, {responseType: 'text'});
  }

  updateImageProduct(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this.httpClient.post<{filename: string}>(`${this.url}/admin/products/upload`, formData)
    .pipe(
      tap(response => this.fileNameSubject$.set(response.filename))
    )
  }

  getFileName(){
    return this.fileNameSubject$();
  }

}
