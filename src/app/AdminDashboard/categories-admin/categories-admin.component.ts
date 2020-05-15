import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from 'src/app/shared/api-category.service';
import { ApiProductService } from 'src/app/shared/api-product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {
editedId;
  categories = [];
  config: any;
  numbers;
  editContext: boolean =false;
  isAddCategoryContext: boolean =false;
  addContext: boolean =false;
  constructor(private apiCategoryService: ApiCategoryService, private apiProductService: ApiProductService, 
    private activatedRoute: ActivatedRoute, private cartService: CartService, private apiService: ApiAuthService) { }

  ngOnInit(): void {
    let div= document.getElementById("categories");
    div.className = "nav-link active";
    this.apiCategoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      this.config = {
        itemsPerPage: 1,
        currentPage: 1,
        totalItems: 2
      };
      this.numbers = this.config.totalItems/this.config.itemsPerPage;
      console.log(this.categories)
    });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  deleteSubCategory(id){  
    this.apiCategoryService.deleteSubCategory(id).subscribe((res: any) => {
      this.apiCategoryService.getCategories().subscribe((res: any) => {
        this.categories = res.data;
      });
    });
  }

  deleteCategory(category){  
    for (let i=0; i<category.subCategories.length; i++) {
      this.deleteSubCategory(category.subCategories[i]);
    }
    this.apiCategoryService.deleteCategory(category._id).subscribe((res: any) => {
      this.apiCategoryService.getCategories().subscribe((res: any) => {
        this.categories = res.data;
      });
    });
  }

  editCategory(category) {
    if(this.editContext == false) {
      this.editContext = true;
      this.editedId = category._id;
    }
    else {
      this.editContext = false;
      var newName = (<HTMLInputElement>document.getElementById(category.name)).value;
      var body = {
        name: newName
      };
      this.apiCategoryService.updateCategory(category._id, body).subscribe((res: any) => {
        this.apiCategoryService.getCategories().subscribe((res: any) => {
          this.categories = res.data;
          this.addContext = false;
        });
      });
    }
  }

  isEditContext(id): boolean{
    var isDiv: boolean;
    if (id==this.editedId)
      isDiv = true;
    else
      isDiv = false;
    return isDiv && this.editContext;
  }

  addSubCategory(id){
    var divId = id+"1";
    var newName = (<HTMLInputElement>document.getElementById(divId)).value;
    var body = {
      name: newName,
      products: []
    };
    this.apiCategoryService.addSubCategory(id, body).subscribe((res: any) => {
      this.apiCategoryService.getCategories().subscribe((res: any) => {
        this.categories = res.data;
        this.addContext = false;
      });
    });
  }

  setAddContext(category){
    if(this.addContext == false) {
      this.addContext = true;
    }
  }

  isAddContext(id) : boolean{
    return this.isEditContext(id) && this.addContext;
  }

  addCategory() {
  var newName = (<HTMLInputElement>document.getElementById("add")).value;
  var body = {
    name: newName
  };
    this.apiCategoryService.addCategory(body).subscribe((ress: any) => {
      this.isAddCategoryContext = false;
      var newCatId = ress.data._id;
      this.apiCategoryService.getCategories().subscribe((res: any) => {
        this.categories = res.data;
        this.addContext = true;
        this.editedId = newCatId;
        this.editContext = true;
      });
    });
  }

  setAddCategoryContext() {
    this.isAddCategoryContext = true;
  }
}
