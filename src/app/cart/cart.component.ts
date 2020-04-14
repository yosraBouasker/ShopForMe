import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { ApiAuthService } from '../shared/api-auth.service';
import { ApiProductService } from '../shared/api-product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public idClient;
  public idProduct;
  cart;
  public loggedIn: boolean;
  purchaseDetails = [];

  constructor(private productApiService:ApiProductService ,private apiService: ApiAuthService, public cartApiService: CartService) {
    console.log("marhbé");
    this.idProduct = this.cartApiService.idProductToAdd;
    this.apiService.decodeToken();
    this.idClient = this.apiService.clientId;
    this.loggedIn = this.idClient != null || this.idClient != undefined;
    this.executeModal();
  }

  ngOnInit(): void {
  }

  public isEmpty(): boolean{
    if (this.cartApiService.cart == undefined
      || this.cartApiService.cart == null){
      return true;}
    else if (this.cartApiService.cart.purchaseDetails == undefined
    || this.cartApiService.cart.purchaseDetails.length == 0){
      return true;
    }
    else
      return false;
  }

  executeModal() {
    var idProduct = this.idProduct;
    //if not from cart icon
    if (idProduct != null || idProduct != undefined) {
      var product;
      var fPrice;
      var quantity = 1;
      this.productApiService.getProduct(idProduct).subscribe((res: any) => {
        product = res.data;
        fPrice = this.getFinalPrice(product.price, product.discount);
        //if logged in
        if (this.loggedIn) {
          var idCart = localStorage.getItem('cart');
          let hasCart: boolean = idCart != null || idCart != undefined;
          //if never used cart    
          if (!hasCart){
            console.log("sahha")
            let body = {};
            this.cartApiService.addPurchase(this.idClient,body).subscribe((res: any) => {
              this.cart = res.data;
              this.cartApiService.cart = res.data;
              localStorage.setItem('cart',this.cart._id);
  
              let purchaseDetail = {
                'quantity': quantity,
                'subTotal': fPrice*quantity,
                'product': idProduct
              }
              this.cartApiService.addPurchaseDetail(this.cart._id, purchaseDetail).subscribe((ress: any) => {
                this.cartApiService.isCartEmpty = this.isEmpty();
                this.purchaseDetails = this.cart.purchaseDetails;
                this.cartApiService.purchaseDetailsList = res.data.purchaseDetails;
              });
            });
          }
          else {
            console.log("deja aandek")
            var exists: boolean = false;
            var idPurchaseDetail;
            var oldQty;
            this.cartApiService.getPurchase(idCart).subscribe((res: any) => {
              for(let i=0; i<res.data.purchaseDetails.length; i++) {
                if (res.data.purchaseDetails[i].product._id == idProduct){
                  exists = true;
                  idPurchaseDetail = res.data.purchaseDetails[i]._id;
                  oldQty = res.data.purchaseDetails[i].quantity;
                }
              }
              if (!exists){
                let purchaseDetail = {
                  'quantity': quantity,
                  'subTotal': fPrice*quantity,
                  'product': idProduct
                }
                this.cartApiService.addPurchaseDetail(idCart, purchaseDetail).subscribe((ress: any) => {
                  this.cartApiService.getPurchase(idCart).subscribe((res: any) => {
                    this.cart = res.data;
                    this.cartApiService.cart = res.data;
                    this.purchaseDetails = res.data.purchaseDetails;
                    this.cartApiService.isCartEmpty = this.isEmpty();
                    this.cartApiService.purchaseDetailsList = res.data.purchaseDetails;
                  });
                });
              }
              else {
                var purchaseDetail = {
                  "quantity": oldQty+1,
                  "subTotal": fPrice*(oldQty+1)
                }
                this.cartApiService.updatePurchaseDetail(idPurchaseDetail, purchaseDetail).subscribe((ress: any) => {
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
            });
          }
        }
      });
    }
    else {
      var idCart = localStorage.getItem('cart');
                  this.cartApiService.getPurchase(idCart).subscribe((res: any) => {
                    this.cart = res.data;
                    this.cartApiService.cart = res.data;
                    this.purchaseDetails = res.data.purchaseDetails;
                    this.cartApiService.isCartEmpty = this.isEmpty();
                    this.cartApiService.purchaseDetailsList = res.data.purchaseDetails;
                  });
    }
  }

  getFinalPrice(price, discount) : number{
      var initialPrice= price - (price*discount)/100;
      return initialPrice;
  }

  calculatePrice(qty, price,discount, id) {
    if (qty != null || qty != 0 || qty != undefined){
      var fPrice;
      fPrice = this.getFinalPrice(price, discount);
      var purchaseDetail = {
        "quantity": qty,
        "subTotal": fPrice*qty
      }
      this.cartApiService.updatePurchaseDetail(id, purchaseDetail).subscribe((ress: any) => {
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

  calculateSubTotal(): number{
    var tot = 0;
    this.cartApiService.purchaseDetailsList.forEach(purchaseDetail =>{
      tot = tot + purchaseDetail.subTotal;
    })
    return tot;
  }

  calculateTotal(): number{
    return this.calculateSubTotal() + 6;
  }

  delete(idPurchaseDetail){
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

