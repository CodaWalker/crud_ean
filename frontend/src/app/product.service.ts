import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Product} from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product:Product;
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }
  ngOnInit() {

  }

  getProducts() {

    return this.http.get(`${this.uri}/products`);
  }

  getProductById(id) {
    return this.http.get(`${this.uri}/products/${id}`)
  }

  addProduct(name, sku, price, createdAt) {
    const product = {
      name: name,
      sku: sku,
      price: price,
      createdAt: createdAt
    };
    return this.http.post(`${this.uri}/products`, product)
  }

  updateProduct(id, name, sku, price, createdAt) {
    const product = {
      name: name,
      sku: sku,
      price: price,
      createdAt: createdAt
    };
    return this.http.put(`${this.uri}/products/${id}`, product);
  }

  deleteProduct(id) {
    return this.http.delete(`${this.uri}/products/${id}`);
  }
}
