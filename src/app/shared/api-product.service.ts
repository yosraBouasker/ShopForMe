import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  decodeToken() {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }

  getProduct(id) {
    return this.http.get('http://localhost:3000/product/byId/'+ id);
  }

  getProducts() {
    return this.http.get('http://localhost:3000/product/all');
  }

  getProductsBySubCat(id) {
    return this.http.get('http://localhost:3000/product/all/' + id);
  }

  deleteProduct(id) {
    var body={};
    return this.http.post('http://localhost:3000/product/delete/' + id, body);
  }

  updateProduct(idProd, body) {
    return this.http.post('http://localhost:3000/product/update/' + idProd, body);
  }
  
  addProduct(idSubCat, body) {
    return this.http.post('http://localhost:3000/product/add/' + idSubCat, body);
  }

  getRecommendedProducts(userId) {
    return this.http.get('http://localhost:3000/product/bySearchHistory/' + userId);
  }

  getSimilarProducts(userId) {
    return this.http.get('http://localhost:3000/product/similarToPurchases/' + userId);
  }
}
