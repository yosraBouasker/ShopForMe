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

  deleteSubCategory(id){
    var body={};
    return this.http.post('http://localhost:3000/subCategory/delete/' + id, body);
  }

  deleteCategory(id){
    var body={};
    return this.http.post('http://localhost:3000/category/delete/' + id, body);
  }

  updateCategory(id, body){
    return this.http.post('http://localhost:3000/category/update/' + id, body);
  }

  addSubCategory(id, body){
    return this.http.post('http://localhost:3000/subCategory/add/' + id, body);
  }

  addCategory(body){
    return this.http.post('http://localhost:3000/category/add', body);
  }
}
