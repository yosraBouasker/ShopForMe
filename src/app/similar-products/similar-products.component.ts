import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../shared/api-product.service';
import { ApiAuthService } from '../shared/api-auth.service';
import { CartService } from '../shared/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit {

  allProducts = [];
  hasSimilarProducts = false;
  constructor(private apiService: ApiProductService, private apiauthService: ApiAuthService, 
    private cartApiService: CartService) { }

  ngOnInit() {
    this.apiauthService.decodeToken();
    this.hasSimilarProducts = false;
    if (this.isConnected()) {
      console.log("kassartli l batataa")
      this.apiService.getSimilarProducts(this.apiauthService.userId).subscribe((res: any) => {
        this.allProducts = res.data; 
        console.log(res)
        if(this.allProducts.length != 0 && this.allProducts != null && this.allProducts != undefined){
          this.allProducts.reverse();
          this.allProducts = this.allProducts.slice(0,4);
          this.hasSimilarProducts = true;
        }
        var div = document.getElementById("similar");
        if (!this.hasSimilarProducts) {
          div.style.visibility = "hidden";
          var divv = document.getElementById("footer");
          divv.style.marginTop= "-185px";
        }
      })
    }
    else {
    var div = document.getElementById("similar");
      div.style.visibility = "hidden";
      var divv = document.getElementById("footer");
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


