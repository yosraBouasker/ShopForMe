import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  id;
  clientId;
  constructor(public http: HttpClient) { }

  update(form) {
    return this.http.post('http://localhost:3000/profile/update/' + this.id, form);
  }

  info() {
    return this.http.get('http://localhost:3000/profile/info/' + this.id);
  }

  getProfile(id) {
    return this.http.get('http://localhost:3000/profile/info/' + id);
  }

  updateProfile(id,form) {
    return this.http.post('http://localhost:3000/profile/update/' + id, form);
  }

  purchases() {
    return this.http.get('http://localhost:3000/purchase/purchasesByClient/' + this.clientId);
  }

  
  purchasesAdmin(idClient) {
    return this.http.get('http://localhost:3000/purchase/purchasesByClient/' + idClient);
  }

  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      this.id = jwt_decode(token).data._id;
      this.clientId=jwt_decode(token).data.client;
    }
  }

  deletePurchase(id) {
    var body = {}
    return this.http.post('http://localhost:3000/purchase/delete/'+id , body);
  }

  getAllOrders() {
    return this.http.get('http://localhost:3000/purchase/all');
  }

  updateOrder(id, body) {
    return this.http.post('http://localhost:3000/purchase/update/'+id , body);
  }

  getCard() {
    return this.http.get('http://localhost:3000/card/getCard/'+ this.clientId);
  }
  
  addCard(id, body) {
    return this.http.post('http://localhost:3000/card/addCard/'+ id, body);
  }

  updateCard(id, body) {
    return this.http.post('http://localhost:3000/card/updateCard/'+ id, body);
  }
}
