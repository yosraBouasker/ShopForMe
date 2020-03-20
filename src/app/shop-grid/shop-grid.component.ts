import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from '../shared/api-category.service';
import { ApiProductService } from '../shared/api-product.service';

@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.css']
})
export class ShopGridComponent implements OnInit {

  categories = [];
  subCategories = [];
  products=[];
  constructor(private apiCategoryService: ApiCategoryService, private apiProductService: ApiProductService) { }

  ngOnInit() {
    //console.log('here')
    this.apiCategoryService.getCategories().subscribe((res: any) => {
      //console.log(res);
      this.categories = res.data;
      this.subCategories = res.data[0].subCategories;
    });

    this.apiProductService.getProducts().subscribe((res: any) => {
      console.log(res);
      this.products = res.data;
    });
  }

  getFinalPrice(price, discount, id, name) : number{
    
    var dis = document.getElementById(name);
    var off = document.getElementById(id);

    if (discount == 0){
      dis.style.visibility = "hidden";
      off.style.visibility = "hidden";
      return price;
    }
    else {
      var initialPrice= price - (price*discount)/100;
      return initialPrice;
    }
  }

}
