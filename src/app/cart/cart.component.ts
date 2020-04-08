import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { ApiAuthService } from '../shared/api-auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public idClient;
  cart;

  constructor(private apiService: ApiAuthService, private cartApiService: CartService) {
    console.log("marhbé");
   }

  ngOnInit(): void {
  }

  public executeModal(idProduct) {
    this.apiService.decodeToken();
    this.idClient = this.apiService.clientId
    var idCart = localStorage.getItem('cart');
    let hasCart: boolean = idCart != null 
                || idCart != undefined;
    if (!hasCart){
      console.log("sahha")
      let body = {};
      this.cartApiService.addPurchase(this.idClient,body).subscribe((res: any) => {
        this.cart = res.data;
        localStorage.setItem('cart',this.cart._id);
        let purchaseDetail = {
          'quantity': 2,
          'subTotal': 100,
          'product': idProduct
        }
        this.cartApiService.addPurchaseDetail(this.cart._id, purchaseDetail).subscribe((res: any) => {
          console.log(res)
        });
      });
    }

    else {
      console.log("deja aandek")
      let purchaseDetail = {
        'quantity': 2,
        'subTotal': 100,
        'product': idProduct
      }
      this.cartApiService.addPurchaseDetail(idCart, purchaseDetail).subscribe((res: any) => {
        this.cartApiService.getPurchase(idCart).subscribe((res: any) => {
          this.cart = res.data;
          console.log(this.cart)
          console.log(res.data)
        });
      });
    }
  }

}
