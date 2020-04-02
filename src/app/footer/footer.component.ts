import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from '../shared/api-category.service';
import { ApiAuthService } from '../shared/api-auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories =[];

  constructor(private apiCategoryService: ApiCategoryService, private apiService: ApiAuthService) { }

  ngOnInit(): void {
    this.apiCategoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  isConnected() {
    this.apiService.decodeToken();
    return (this.apiService.userId != undefined && this.apiService.userId != null);
  }

  logout(){
    this.apiService.logout();
    document.location.reload();
  }
}
