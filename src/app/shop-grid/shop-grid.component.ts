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
  categories = [];
  subCategories = [];
  products = [];
  // tslint:disable-next-line: max-line-length
  constructor(private apiCategoryService: ApiCategoryService, private apiProductService: ApiProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // tslint:disable-next-line: triple-equals
    if (id != undefined) {
      this.filterProducts(id);
    } else {
      this.apiProductService.getProducts().subscribe((res: any) => {
        //console.log(res);
        this.products = res.data;
      });
    }
    this.apiCategoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  getSubCategoriesByCat(id){
    this.apiCategoryService.getSubCatByCat(id).subscribe((res: any) => {
      console.log("ahiiiiiiiiiiiiiiiii");
      console.log(res);
      this.subCategories = res.data;

    });
  }
  getFinalPrice(price, discount, i, j): number {

    const dis = document.getElementById(j);
    const off = document.getElementById(i);

    // tslint:disable-next-line: triple-equals
    if (discount == 0) {
      dis.style.visibility = 'hidden';
      off.style.visibility = 'hidden';
      return price;
    } else {
      const initialPrice = price - (price * discount) / 100;
      return initialPrice;
    }
  }

  filterProducts(id) {
    this.apiCategoryService.getSubCategoryName(id).subscribe((res: any) => {
      let name = '';
      name = res.data;
      // tslint:disable-next-line: prefer-const
      let path = document.getElementById('path');
      path.innerHTML = name;
      path.style.visibility = 'visible';
      // tslint:disable-next-line: no-shadowed-variable
      this.apiProductService.getProductsBySubCat(id).subscribe((res: any) => {
        this.products = res.data;
      });
    });
  }

}
