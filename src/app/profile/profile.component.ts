import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { ProfileService } from '../shared/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cart;
  purchaseDetails;
  info;
  password;
  images;
  profileImage;
  purchases;
  totalPurchases;
  constructor(public http: HttpClient,public cartApiService: CartService,private profileService: ProfileService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.profileService.decodeToken();
    this.profileService.purchases().subscribe((res: any) => {
      this.purchases = res.data;
      this.totalPurchases = this.purchases.length;
      console.log(this.purchases);
    })

    this.profileService.info().subscribe((res: any) => {
      this.info = res.userResult[0];
      this.password = this.info.password;
      delete(this.info.password);
      if(this.info.client.image != undefined && this.info.client.image != null){
        this.profileImage = "http://localhost:3000/" + this.info.client.image;
      }
      else {
        this.profileImage = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
      }
    })
  }


  selectImage(event){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.images = file;
    }
  }

  updateProfile(name1, lastname1, email1, location1, phone1, image1, pass1) {
    var pass;
    if (pass1!=null || pass1!=undefined)
      pass=pass1;
    else
      pass=this.password;
      phone1 = phone1.replace("(+216) ", "")
    const profile = {
      name: name1,
      lastname: lastname1,
      email: email1,
      location: location1,
      phone: phone1,
      password: pass
    }


    this.profileService.update(profile).subscribe((res: any) => {
      const formData = new FormData();
      formData.append('image',this.images);
      this.http.post<any>('http://localhost:3000/profile/updateImage/'+this.profileService.id,formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
      this.ngOnInit();
      window.location.reload();
    })
  }

  resetBtn(){
    window.location.reload();
  }

  orderDetail(index){
    let div=document.getElementById(index);
    console.log(div)
    if (div.style.visibility==="hidden"){
      div.style.visibility = "visible";
      div.style.height="auto";
    }
    else {
      div.style.visibility = "hidden";
      div.style.height="0";
    }
  }

}
