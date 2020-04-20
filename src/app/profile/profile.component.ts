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
  password

  constructor(private profileService: ProfileService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.profileService.decodeToken();
    this.profileService.info().subscribe((res: any) => {
      this.info = res.userResult[0];
      this.password = this.info.password;
      delete(this.info.password);
    })
  }

  updateProfile(name1, lastname1, email1, location1, phone1, image1, pass1) {
    var pass;
    if (pass1!=null || pass1!=undefined)
      pass=pass1;
    else
      pass=this.password;
    const profile = {
      name: name1,
      lastname: lastname1,
      email: email1,
      location: location1,
      phone: phone1,
      image: image1,
      password: pass
    }

    this.profileService.update(profile).subscribe((res: any) => {
      this.ngOnInit();
      window.location.reload();
    })
  }
  resetBtn(){
    window.location.reload();
  }
}
