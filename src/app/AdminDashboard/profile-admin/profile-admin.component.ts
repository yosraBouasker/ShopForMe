import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/shared/cart.service';
import { ProfileService } from 'src/app/shared/profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  purchaseDetails;
  info;
  purchases;
  totalPurchases;
  constructor(public http: HttpClient,public cartApiService: CartService,private profileService: ProfileService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.profileService.decodeToken();
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.profileService.getProfile(id).subscribe((res: any) => {
      this.info = res.userResult[0];
    })
    this.profileService.purchases().subscribe((res: any) => {
      this.purchases = res.data;
      this.totalPurchases = this.purchases.length;
    })
  }

  orderDetail(index){
    let div=document.getElementById(index);
    if (div.style.visibility==="hidden"){
      div.style.visibility = "visible";
      div.style.height="auto";
    }
    else {
      div.style.visibility = "hidden";
      div.style.height="0";
    }
  }

  updateProfile(name1, lastname1, email1, location1, phone1) {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    phone1 = phone1.replace("(+216) ", "")
    const profile = {
      name: name1,
      lastname: lastname1,
      email: email1,
      location: location1,
      phone: phone1,

    }
    this.profileService.updateProfile(id,profile).subscribe((res: any) => {
      this.ngOnInit();
      window.location.reload();
    })
  }


}
