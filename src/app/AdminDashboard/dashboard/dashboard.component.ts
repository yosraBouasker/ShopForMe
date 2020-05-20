import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiContactService } from 'src/app/shared/api-contact.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ApiProductService } from 'src/app/shared/api-product.service';
import { ProfileService } from 'src/app/shared/profile.service';
import { ApiCategoryService } from 'src/app/shared/api-category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  messages;
  orders;
  categories;
  products;
  clients;
  constructor(public http: HttpClient, private apiAuthService: ApiAuthService,private apiProductService: ApiProductService, private contactApi: ApiContactService, private profileService: ProfileService,private apiCategoryService: ApiCategoryService  ) { }

  ngOnInit(): void {
    let div= document.getElementById("dashboard");
    div.className = "nav-link active";

    this.profileService.getAllOrders().subscribe((res: any) => {
      this.orders = res.data;
      console.log(this.orders);
    });

    this.apiCategoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });

    this.apiProductService.getProducts().subscribe((res: any) => {
      this.products = res.data;
    });
    this.apiAuthService.getClients().subscribe((res: any) => {
      this.clients = res.data;
    });
    this.contactApi.getMessages().subscribe((res: any) => {
      this.messages = res.data;
    });
  }

  getProgress(progress){
    if (progress == "25%")
      return "In progress"
    else if (progress == "50%")
    return "Shipped"
    else if (progress == "75%")
    return "Delivered"
    else if (progress == "100%")
    return "Completed"
  }

  getProfileImg(image): string {
    if(image != undefined && image != null){
      return "http://localhost:3000/" + image;
    }
    else {
      return 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
    }
}
}
