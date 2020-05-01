import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../shared/api-product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { CartComponent } from '../cart/cart.component';
import { ApiAuthService } from '../shared/api-auth.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product;

  constructor(private apiService: ApiProductService,private authService: ApiAuthService, private cartService: CartService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.apiService.decodeToken();
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.apiService.getProduct(id).subscribe((res: any) => {
      this.product = res.data;
    })
  }

  getFinalPrice() : number{

    var dis = document.getElementById("discount");

    if (this.product.discount == 0){
      dis.style.visibility = "hidden";
      return this.product.price;
    }
    else {
      var initialPrice= this.product.price - (this.product.price*this.product.discount)/100;
      return initialPrice;
    }
  }

  openModal(val) {
    this.cartService.idProductToAdd = val;
    var cart = new CartComponent(this.apiService, this.authService, this.cartService);
    this.cartService.isCartEmpty = cart.isEmpty();
  }

}
