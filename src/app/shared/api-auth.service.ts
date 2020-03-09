import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class ApiAuthService {
  userId;
  constructor(private http: HttpClient) { }

  login(form) {
    return this.http.post('http://localhost:3000/auth/login', form);
  }

  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      this.userId = jwt_decode(token).data._id;
    }
  }

  register(form) {
    return this.http.post('http://localhost:3000/auth/register', form);
  }
}
