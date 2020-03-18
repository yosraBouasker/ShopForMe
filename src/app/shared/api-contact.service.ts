import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiContactService {
  decodeToken() {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }

  addMessage(form) {
    return this.http.post('http://localhost:3000/message/add', form);
  }

  getMessages() {
    return this.http.get('http://localhost:3000/message/all');
  }
}
