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
}
