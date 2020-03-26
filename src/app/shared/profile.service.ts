import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  id;
  constructor(private http: HttpClient) { }

  update(form) {
    console.log("up");
    console.log(this.id);
    return this.http.post('http://localhost:3000/profile/update/' + this.id, form);
  }

  info() {
    console.log(this.id);
    return this.http.get('http://localhost:3000/profile/info/' + this.id);
  }

  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log(jwt_decode(token));
      this.id = jwt_decode(token).data._id;
    }
  }
}
