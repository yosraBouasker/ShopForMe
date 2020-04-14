import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { ApiAuthService } from '../shared/api-auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  form: any;
  info;
  cart;
  purchaseDetails = [];

  constructor(public cartApiService: CartService, private apiService: ApiAuthService, private profileService: ProfileService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.profileService.decodeToken();
    this.profileService.info().subscribe((res: any) => {
      console.log(res);
      this.info = res.userResult[0];
    })
  }

  setPurchase(add, cit, cod, phon) {
    this.form = {
      address: add,
      city: cit,
      code: cod,
      phone: phon,
    }
  var first = document.getElementById("first");
  first.className = "";
  var second = document.getElementById("second");
  second.className = "active";
    this.apiService.decodeToken();
    var address = add + ", " + cit + ", " + cod;
    var clientId = this.apiService.clientId;
    var odate = new Date();
    var sdate = new Date();
    sdate.setDate(odate.getDate() + 2);
    const purch = {
      client: clientId,
      shippingAddress: address,
      phone: phon,
      shippingDate: sdate,
      orderDate: odate,
    }

    this.cartApiService.updatePurchase(this.cartApiService.cart._id, purch).subscribe((res: any) => {
      console.log(res)
    });
  }

  previous() {
    this.ngOnInit()
  }

  getFinalPrice(price, discount): number {
    var initialPrice = price - (price * discount) / 100;
    return initialPrice;
  }

  calculatePrice(qty, price, discount, id) {
    if (qty != null || qty != 0 || qty != undefined) {
      var fPrice;
      fPrice = this.getFinalPrice(price, discount);
      var purchaseDetail = {
        "quantity": qty,
        "subTotal": fPrice * qty
      }
      this.cartApiService.updatePurchaseDetail(id, purchaseDetail).subscribe((res: any) => {
        var idCart = localStorage.getItem('cart');
        this.cartApiService.getPurchase(idCart).subscribe((res: any) => {
          this.cart = res.data;
          this.cartApiService.cart = res.data;
          this.purchaseDetails = res.data.purchaseDetails;
          this.cartApiService.isCartEmpty = this.isEmpty();
          this.cartApiService.purchaseDetailsList = res.data.purchaseDetails;
        });
      });
    }
  }
  public isEmpty(): boolean {
    if (this.cartApiService.cart == undefined
      || this.cartApiService.cart == null) {
      return true;
    }
    else if (this.cartApiService.cart.purchaseDetails == undefined
      || this.cartApiService.cart.purchaseDetails.length == 0) {
      return true;
    }
    else
      return false;
  }
  calculateSubTotal(): number {
    var tot = 0;
    this.cartApiService.purchaseDetailsList.forEach(purchaseDetail => {
      tot = tot + purchaseDetail.subTotal;
    })
    return tot;
  }

  calculateTotal(): number {
    return this.calculateSubTotal() + 6;
  }

  delete(idPurchaseDetail) {
    var idCart = localStorage.getItem('cart');
    this.cartApiService.deletePuchaseDetail(idPurchaseDetail).subscribe((ress: any) => {
      this.cartApiService.getPurchase(idCart).subscribe((res: any) => {
        this.cart = res.data;
        this.cartApiService.cart = res.data;
        this.purchaseDetails = res.data.purchaseDetails;
        this.cartApiService.purchaseDetailsList = res.data.purchaseDetails;
      });
    });
  }

}