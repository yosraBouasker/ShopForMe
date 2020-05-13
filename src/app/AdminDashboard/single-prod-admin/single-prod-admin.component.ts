import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiCategoryService } from 'src/app/shared/api-category.service';
import { CartService } from 'src/app/shared/cart.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ApiProductService } from 'src/app/shared/api-product.service';

@Component({
  selector: 'app-single-prod-admin',
  templateUrl: './single-prod-admin.component.html',
  styleUrls: ['./single-prod-admin.component.css']
})
export class SingleProdAdminComponent implements OnInit {
  product;
  constructor(public http: HttpClient,private apiCategoryService: ApiCategoryService, private apiProductService: ApiProductService, 
    private activatedRoute: ActivatedRoute, private cartService: CartService, private apiService: ApiAuthService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiProductService.getProduct(id).subscribe((res: any) => {
      this.product = res.data;
    });
  }

}
