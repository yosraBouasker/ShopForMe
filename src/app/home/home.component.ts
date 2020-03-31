import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../shared/api-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allProducts = [];
  adOffers=[];
  newOffers=[];
  constructor(private apiService: ApiProductService) { }

  ngOnInit() {
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
    })
  }

  getFinalPrice(price, discount) : number{
      var finalPrice= price - (price*discount)/100;
      return finalPrice;
  }

}
