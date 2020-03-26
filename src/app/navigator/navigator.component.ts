import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from '../shared/api-category.service';
import {Router} from "@angular/router";
import { ApiProductService } from '../shared/api-product.service';
import { ShopGridComponent } from '../shop-grid/shop-grid.component';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  categories = [];
  subCategories = [];
  constructor(private apiService: ApiCategoryService, private router: Router, private apiProductService: ApiProductService) { }

  ngOnInit() {
    this.apiService.getCategories().subscribe((res: any) => {
      console.log(res);
      this.categories = res.data;
      this.subCategories = res.data[0].subCategories;
    });

  }
}
