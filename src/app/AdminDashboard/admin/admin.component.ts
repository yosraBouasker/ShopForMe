import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiContactService } from 'src/app/shared/api-contact.service';
import { ProfileService } from 'src/app/shared/profile.service';
import { ApiCategoryService } from 'src/app/shared/api-category.service';
import { ApiProductService } from 'src/app/shared/api-product.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
messages;

  constructor(public http: HttpClient,private contactApi: ApiContactService, private apiService: ApiAuthService, private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('isAdmin')=='true') {
    this.contactApi.getMessages().subscribe((res: any) => {
      this.messages = res.data;
    });
  }
  else {
    this.router.navigate(['/loginAdmin'])
          .then(() => {
            window.location.reload();
          });
  }
  }

  logout(){
    this.apiService.logout();
    this.router.navigate(['/loginAdmin'])
          .then(() => {
            window.location.reload();
          });
  }
}
