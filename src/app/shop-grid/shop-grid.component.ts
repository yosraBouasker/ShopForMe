import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from '../shared/api-category.service';
import { ApiProductService } from '../shared/api-product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.css']
})
export class ShopGridComponent implements OnInit {
  p: number = 1;
  categories = [];
  subCategories = [];
  products=[];
  items = [];
  constructor(private apiCategoryService: ApiCategoryService, private apiProductService: ApiProductService,  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.filterProducts(id);
    }
    else {
      this.apiProductService.getProducts().subscribe((res: any) => {
        console.log(res);
        this.products = res.data;
      });
    }
    this.apiCategoryService.getCategories().subscribe((res: any) => {
      //console.log(res);
      this.categories = res.data;
      this.subCategories = res.data[0].subCategories;
    });    
  }

  getFinalPrice(price, discount, i, j) : number{

    var dis = document.getElementById(j);
    var off = document.getElementById(i);

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

  filterProducts(id) {
    this.apiCategoryService.getSubCategoryName(id).subscribe((res: any) => {
      var name="";
      name = res.data;
      var path= document.getElementById("path");
      path.innerHTML=name;
      path.style.visibility="visible";
      this.apiProductService.getProductsBySubCat(id).subscribe((res: any) => {
        this.products = res.data;
      });
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.products = pageOfItems;
}
}
