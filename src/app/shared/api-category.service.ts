import { HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { Injectable, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get('http://localhost:3000/category/all');
  }

  getSubCategories() {
    return this.http.get('http://localhost:3000/subCategory/all');
  }

  getSubCatByCat(id) {
    return this.http.get('http://localhost:3000/subCategory/byCategory/'+id);
  }

  getSubCategoryName(id) {
    return this.http.get('http://localhost:3000/subCategory/name/' + id);
  }
}
