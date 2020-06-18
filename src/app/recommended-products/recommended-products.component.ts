import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../shared/api-product.service';
import { ApiAuthService } from '../shared/api-auth.service';
import { CartService } from '../shared/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.css']
})
export class RecommendedProductsComponent implements OnInit {
  allProducts = [];
  hasSearchHistory = false;
  constructor(private apiService: ApiProductService, private apiauthService: ApiAuthService, 
    private cartApiService: CartService) { }

  ngOnInit() {
    this.apiauthService.decodeToken();
    this.hasSearchHistory = false;
    if (this.isConnected()) {
      this.apiService.getRecommendedProducts(this.apiauthService.userId).subscribe((res: any) => {
        this.allProducts = res.data; 
        if(this.allProducts.length != 0 && this.allProducts != null && this.allProducts != undefined){
          this.allProducts.reverse();
          this.allProducts = this.allProducts.slice(0,8);
          this.hasSearchHistory = true;
        }
        var div = document.getElementById("recommended");
        if (!this.hasSearchHistory) {
          div.style.visibility = "hidden";
          var divv = document.getElementById("top");
        }
      })
    }
    else {
    var div = document.getElementById("recommended");
      div.style.visibility = "hidden";
      var divv = document.getElementById("top");
      divv.style.marginTop= "-185px";
    }
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

  
  isConnected() {
    this.apiauthService.decodeToken();
    return (this.apiauthService.userId != undefined && this.apiauthService.userId != null && localStorage.getItem("isAdmin") != "true");
  }

}
