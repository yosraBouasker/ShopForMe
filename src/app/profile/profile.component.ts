import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { ProfileService } from '../shared/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  info;

  constructor(private profileService: ProfileService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.profileService.decodeToken();
    this.profileService.info().subscribe((res: any) => {
      console.log(res);
      this.info = res.userResult[0];
    })
  }

  updateProfile(name1, lastname1, email1, location1, phone1, image1, pass1) {

    const profile = {
      name: name1,
      lastname: lastname1,
      email: email1,
      location: location1,
      phone: phone1,
      image: image1,
      password: pass1
    }

    this.profileService.update(profile).subscribe((res: any) => {
      console.log('update');
      console.log(res);
      console.log("hii");
      console.log(image1);
      this.ngOnInit();
      window.location.reload();
    })
  }
  resetBtn(){
    window.location.reload();
  }
}
