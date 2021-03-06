import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../shared/api-product.service';
import { ApiAuthService } from '../shared/api-auth.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allProducts = [];
  adOffers=[];
  newOffers=[];
  constructor(private apiService: ApiProductService, private authService: ApiAuthService, private cartService: CartService) {
   }

  ngOnInit() {
    this.authService.decodeToken();
    this.apiService.getProducts().subscribe((res: any) => {
      this.allProducts = res.data;

      //advertised offers
      var nb=0;
      for (let i=0; i<this.allProducts.length; i++){
        if (this.allProducts[i].advertised==true && this.allProducts[i].discount !=0 && nb<6){
          this.adOffers.push(this.allProducts[i]);
          nb++;
        }
      }

      //New offers
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
      dates = dates.slice(0,6);
      for (let j=0; j<6; j++) {
        for (let i=0; i<this.allProducts.length; i++) {
          if (this.allProducts[i].updatedAt != undefined){
            if (this.allProducts[i].updatedAt == dates[j]){
              this.newOffers.push(this.allProducts[i]);
            }
          }
          else {
            if (this.allProducts[i].createdAt == dates[j]){
              this.newOffers.push(this.allProducts[i]);
            }
          }
        }
      }

      //card Carousel
      // if (this.isConnected()) {
      //       var divv = document.getElementById("cardCarousel");
      //       divv.style.marginTop= "-185px";
      // }
      // else {
      // var div = document.getElementById("cardCarousel");
      //   var divv = document.getElementById("top");
      //   divv.style.marginTop= "-185px";
      // }
    })
  }

  getFinalPrice(price, discount) : number{
      var finalPrice= price - (price*discount)/100;
      return finalPrice;
  }
  
  openModal(val) {
    this.cartService.idProductToAdd = val;
    var cart = new CartComponent(this.apiService, this.authService, this.cartService);
    this.cartService.isCartEmpty = cart.isEmpty();
  }

  isConnected() {
    this.authService.decodeToken();
    return (this.authService.userId != undefined && this.authService.userId != null && localStorage.getItem("isAdmin") != "true");
  }
}
