import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from '../shared/api-category.service';
import { ApiProductService } from '../shared/api-product.service';
import { ActivatedRoute } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../shared/cart.service';
import { ApiAuthService } from '../shared/api-auth.service';

@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.css']
})
export class ShopGridComponent implements OnInit {
  categories = [];
  subCategories = [];
  products = [];
  allProd = [];
  config: any;
  itemsPerPage;
  term;
  
  constructor(private apiCategoryService: ApiCategoryService, private apiProductService: ApiProductService, 
    private activatedRoute: ActivatedRoute, private cartService: CartService, private apiService: ApiAuthService) {
    this.config = {
      itemsPerPage: 200,
      currentPage: 1,
      totalItems: this.products.length
    };
   }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // tslint:disable-next-line: triple-equals
    if (id != undefined) {
      this.filterProducts(id);
    } else {
      this.apiProductService.getProducts().subscribe((res: any) => {
        //console.log(res);
        this.products = res.data;
        this.allProd = res.data;
        this.config.itemsPerPage = this.products.length;
      });
    }
    this.apiCategoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  getSubCategoriesByCat(id){
    this.apiCategoryService.getSubCatByCat(id).subscribe((res: any) => {
      console.log("ahiiiiiiiiiiiiiiiii");
      console.log(res);
      this.subCategories = res.data;

    });
  }
  getFinalPrice(price, discount, i, j): number {

    const dis = document.getElementById(j);
    const off = document.getElementById(i);

    // tslint:disable-next-line: triple-equals
    if (discount == 0) {
      dis.style.visibility = 'hidden';
      off.style.visibility = 'hidden';
      return price;
    } else {
      const initialPrice = price - (price * discount) / 100;
      return initialPrice;
    }
  }

  filterProducts(id) {
    this.apiCategoryService.getSubCategoryName(id).subscribe((res: any) => {
      let name = '';
      name = res.data;
      // tslint:disable-next-line: prefer-const
      let path = document.getElementById('path');
      path.innerHTML = name;
      path.style.visibility = 'visible';
      // tslint:disable-next-line: no-shadowed-variable
      this.apiProductService.getProductsBySubCat(id).subscribe((res: any) => {
        this.products = res.data;
      });
    });
  }

  getDiscountedPrice(price, discount) : number{
    if (discount != 0){
      return price - (price * discount) / 100;
    }
    else
      return price;
  }

  filter(val, dis){
    var names=[];
    var prices = [];
    var filtered = [];
    console.log(filtered)
    // reset
    if (val.value == "Default sorting") {
      if (dis.value == "All"){
        this.ngOnInit();
      }
      else {
        this.discounted(dis,val)
      }
    }
    // A-Z
    if (val.value == "A - Z") {
      for (let i=0; i<this.products.length; i++){
            names[i] = this.products[i].name.toLowerCase();
        }
        console.log(names);
      names.sort();
      console.log(names);
      for (let j=0; j<names.length; j++) {
        for (let i=0; i<this.products.length; i++) {
            if (this.products[i].name.toLowerCase() == names[j]){
              filtered.push(this.products[i]);
            }
        }
      }
      console.log(filtered)
      this.products = filtered;
    }
    // Z-A
    if (val.value == "Z - A") {
      for (let i=0; i<this.products.length; i++){
            names[i] = this.products[i].name.toLowerCase();
        }
        console.log(names);
        names.sort();
      names.reverse();
      console.log(names);
      for (let j=0; j<names.length; j++) {
        for (let i=0; i<this.products.length; i++) {
            if (this.products[i].name.toLowerCase() == names[j]){
              filtered.push(this.products[i]);
            }
        }
      }
      console.log(filtered)
      this.products = filtered;
    }
    // low
    if (val.value == "Low - High Price") {
      for (let i=0; i<this.products.length; i++){
            prices[i] = this.getDiscountedPrice(this.products[i].price, this.products[i].discount);
        }
      console.log(prices);
      prices.sort(function(a, b){
          return a - b;
      });
      console.log(prices);
      for (let j=0; j<prices.length; j++) {
        for (let i=0; i<this.products.length; i++) {
            if (this.getDiscountedPrice(this.products[i].price, this.products[i].discount) == prices[j]){
              var exists: boolean = false;
              for (let k=0; k<filtered.length; k++){
                if (this.products[i]._id == filtered[k]._id){
                  exists = true;
                }
              }
              if (!exists){
                filtered.push(this.products[i]);
              }
            }
        }
      }
      console.log(filtered)
      this.products = filtered;
    }
    // high
    if (val.value == "High - Low Price") {
      for (let i=0; i<this.products.length; i++){
            prices[i] = this.getDiscountedPrice(this.products[i].price, this.products[i].discount);
        }
      console.log(prices);
      prices.sort(function(a, b){
          return b - a;
      });
      console.log(prices);
      for (let j=0; j<prices.length; j++) {
        for (let i=0; i<this.products.length; i++) {
            if (this.getDiscountedPrice(this.products[i].price, this.products[i].discount) == prices[j]){
              var exists: boolean = false;
              for (let k=0; k<filtered.length; k++){
                if (this.products[i]._id == filtered[k]._id){
                  exists = true;
                }
              }
              if (!exists){
                filtered.push(this.products[i]);
              }
            }
        }
      }
      console.log(filtered)
      this.products = filtered;
    }
  }

  discounted(dis, val){
    console.log(dis.value)
    var offers=[];
    if(dis.value == "All"){
      console.log("here?")
      this.products = this.allProd;
        this.filter(val, dis);
    }
    if(dis.value == "Discount"){
      this.products = this.allProd;
      for (let i=0; i<this.products.length; i++){
          if(this.products[i].discount !=0) {
              offers.push(this.products[i]);
          }
      }
      console.log(offers)
      this.products = offers;
      if (val.value != "Default sorting"){
        this.filter(val, dis);
      }
      
    }
    else if(dis.value == "No discount"){
      this.products = this.allProd;
      for (let i=0; i<this.products.length; i++){
        if(this.products[i].discount ==0) {
            offers.push(this.products[i]);

        }
      }
      console.log(offers)
      this.products = offers;
      if (val.value != "Default sorting"){
        this.filter(val, dis);
      }
    }
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  setItemsPerPage(items) {
    if (items.value == "All items"){
      this.config.itemsPerPage = this.products.length;
    }
    if (items.value == "Item on page 6"){
      this.config.itemsPerPage = 6;
    }
    if (items.value == "Item on page 9"){
      this.config.itemsPerPage = 9;
    }
    if (items.value == "Item on page 12"){
      this.config.itemsPerPage = 12;
    }
  }

  openModal(val) {
    var cart = new CartComponent(this.apiService, this.cartService);
    cart.executeModal(val);
  }

}
