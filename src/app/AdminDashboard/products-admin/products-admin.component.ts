import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/shared/cart.service';
import { ProfileService } from 'src/app/shared/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCategoryService } from 'src/app/shared/api-category.service';
import { ApiProductService } from 'src/app/shared/api-product.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  products;
  subCat="SubCategory";
  subCategories;
  selectedSubCatId;
  images;
  selectedProduct;
  term;

  constructor(public http: HttpClient,private apiCategoryService: ApiCategoryService, private apiProductService: ApiProductService, 
    private activatedRoute: ActivatedRoute, private cartService: CartService, private apiService: ApiAuthService) { }

  ngOnInit(): void {
    let div= document.getElementById("products");
    div.className = "nav-link active";
    this.subCat="SubCategory";
    this.apiProductService.getProducts().subscribe((res: any) => {
      this.products = res.data;
    });
    this.apiCategoryService.getSubCategories().subscribe((res: any) => {
      this.subCategories = res.data;
    });
  }

  deleteProduct(id) {
    this.apiProductService.deleteProduct(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  addProduct(ref, name, desc, price, disc, ad) {
    var disco = disc.replace("%", "");
    var body = {
      reference: ref,
      name: name,
      description: desc,
      price: price,
      discount: disco,
      advertised: ad
    }
    this.apiProductService.addProduct(this.selectedSubCatId, body).subscribe((res: any) => {
      var formData = new FormData();
      formData.append('image',this.images);
      this.http.post<any>('http://localhost:3000/product/updateImage/'+res.data._id,formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
      this.ngOnInit();
      window.location.reload();
    });
  }

  selectImage(event){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.images = file;
    }
  }

  setSubCat(subcate){
    this.subCat = subcate.name;
    this.selectedSubCatId = subcate._id;
    console.log(this.selectedSubCatId)
  }

  setSelectedProduct(product) {
    this.selectedProduct = product;
    this.subCat = product.subCategory.name;
  }

  editProduct(ref, name, desc, price, disc, ad, img) {
    var disco = disc.replace("%", "");
    var body = {
      reference: ref,
      name: name,
      description: desc,
      price: price,
      discount: disco,
      advertised: ad,
      image: this.selectedProduct.image
    }
    this.apiProductService.updateProduct(this.selectedProduct._id, body).subscribe((res: any) => {
      if (img != undefined || img!=null){
        var formData = new FormData();
        formData.append('image',this.images);
        this.http.post<any>('http://localhost:3000/product/updateImage/'+this.selectedProduct._id,formData).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
      this.ngOnInit();
      window.location.reload();
    });
  }
}
