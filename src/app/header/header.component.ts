import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../shared/api-auth.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../shared/cart.service';
import { ApiProductService } from '../shared/api-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: ApiAuthService, private cartService: CartService, private productService: ApiProductService, private router: Router) { }

  ngOnInit(): void {
  }

  isConnected() {
    this.apiService.decodeToken();
    return (this.apiService.userId != undefined && this.apiService.userId != null);
  }
  
  logout(){
    this.apiService.logout();
    this.router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
  }
  openModal(val) {
    this.cartService.idProductToAdd = val;
    var cart = new CartComponent(this.productService, this.apiService, this.cartService);
    this.cartService.isCartEmpty = cart.isEmpty();
  }

}
