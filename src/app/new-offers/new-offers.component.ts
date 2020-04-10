import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../shared/api-product.service';
import { CartComponent } from '../cart/cart.component';
import { ApiAuthService } from '../shared/api-auth.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.css']
})
export class NewOffersComponent implements OnInit {
  allProducts = [];
  offers=[];
  constructor(private apiService: ApiProductService, private apiauthService: ApiAuthService, private cartApiService: CartService) { }

  ngOnInit() {
    this.apiService.getProducts().subscribe((res: any) => {
      this.allProducts = res.data;
      var dates=[];
      for (let i=0; i<this.allProducts.length; i++){
          if(this.allProducts[i].discount !=0) {
            if (this.allProducts[i].updatedAt != undefined){
              dates[i] = this.allProducts[i].updatedAt;
            }
            else {
              dates[i] = this.allProducts[i].createdAt;
            }
          }
      }
      dates.reverse();
      dates = dates.slice(0,4);
      for (let j=0; j<4; j++) {
        for (let i=0; i<this.allProducts.length; i++) {
          if (this.allProducts[i].updatedAt != undefined){
            if (this.allProducts[i].updatedAt == dates[j]){
              this.offers.push(this.allProducts[i]);
            }
          }
          else {
            if (this.allProducts[i].createdAt == dates[j]){
              this.offers.push(this.allProducts[i]);
            }
          }
        }
      }
    })
  }

  getFinalPrice(price, discount) : number{
      var finalPrice= price - (price*discount)/100;
      return finalPrice;
  }
  
  openModal(val) {
    this.cartApiService.idProductToAdd = val;
    var cart = new CartComponent(this.apiService, this.apiauthService, this.cartApiService);
    this.cartApiService.isCartEmpty = cart.isEmpty();
  }

}
