import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { HomeComponent } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})

export class ApiAuthService {
  userId;
  public clientId;
  constructor(private http: HttpClient, private router: Router) { }

  login(form) {
    return this.http.post('http://localhost:3000/auth/login', form);
  }

  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      this.userId = jwt_decode(token).data._id;
      this.clientId = jwt_decode(token).data.client;
    }
  }

  register(form) {
    return this.http.post('http://localhost:3000/auth/register', form);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    this.router.navigate(['home']);
  }

  getClients(){
    return this.http.get('http://localhost:3000/client/all');
  }

  deleteClient(id){
    var body = {}
    return this.http.post('http://localhost:3000/client/delete/' + id, body);
  }
}
