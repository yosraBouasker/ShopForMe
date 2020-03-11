import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from '../shared/api-category.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  categories = [];
  subCategories = [];
  constructor(private apiService: ApiCategoryService) { }

  ngOnInit() {
    console.log('here')
    this.apiService.getCategories().subscribe((res: any) => {
      console.log(res);
      this.categories = res.data;
      this.subCategories = res.data[0].subCategories;
    });
    
  }

  // getSubCategorie(id) {
  //   console.log(id);
  //   this.apiService.getSubCategories(id).subscribe((res: any) => {
  //     console.log(res);
  //     this.subCategories = res.data;
  //   });
  // }

}
