import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addPurchase(id, body) {
    return this.http.post('http://localhost:3000/purchase/add/'+id, body);
  }

  updatePurchase(id, body) {
    return this.http.post('http://localhost:3000/purchase/update/'+id, body);
  }

  deletePuchase(id) {
    var body ={};
    return this.http.post('http://localhost:3000/purchase/delete/'+id, body);
  }
  
  getPurchase(id) {
    return this.http.get('http://localhost:3000/purchase/byId/'+id);
  }

  getPurchaseDetail(id) {
    return this.http.get('http://localhost:3000/purchase/byId/'+id);
  }

  addPurchaseDetail(id, body) {
    return this.http.post('http://localhost:3000/purchaseDetail/add/'+id, body);
  }

  updatePurchaseDetail(id, body) {
    return this.http.post('http://localhost:3000/purchaseDetail/update/'+id, body);
  }

  deletePuchaseDetail(id) {
    var body ={};
    return this.http.post('http://localhost:3000/purchaseDetail/delete/'+id, body);
  }


}
