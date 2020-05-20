
import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from '../shared/api-category.service';
import { ApiAuthService } from '../shared/api-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories =[];

  constructor(private apiCategoryService: ApiCategoryService, private apiService: ApiAuthService, private router: Router) { }

  ngOnInit(): void {
    this.apiCategoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  isConnected() {
    this.apiService.decodeToken();
    return (this.apiService.userId != undefined && this.apiService.userId != null && localStorage.getItem("isAdmin") != "true");
  }

  logout(){
    this.apiService.logout();
    this.router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
  }
}
