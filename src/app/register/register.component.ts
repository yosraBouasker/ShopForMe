import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiAuthService } from '../shared/api-auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message = '';
  strength = '';
  emailValidation='';

  constructor(private apiService: ApiAuthService, private router: Router, private apiCard: ProfileService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {
  }

  registerBtn() {
    this.message = ""
    if (this.registerForm.valid) {
      this.apiService.register(this.registerForm.value).subscribe((res: any) => {
        if (res.message === 'ok') {
          var body = {}
          localStorage.setItem('token', res.token);
          this.apiService.decodeToken()
          this.apiCard.addCard(this.apiService.clientId, body).subscribe((res: any) => {
            this.router.navigate(['/home'])
            .then(() => {
              window.location.reload();
            });
          });
        } else {
          this.message = res.message;
        }
      })
    }
    else {
      this.message = "Please make sure you entered valid information."
    }
  }

  validatePassword(password) {
    const HTMLElement = document.getElementById('pwdVisibility');
    const strengthPwd = document.getElementById('strength');
    var miniscule = /[a-z]/;
    var majuscule = /[A-Z]/;
    var chiffre = /[0-9]/;

    var score = 0;
    if(password.length > 0){
      HTMLElement.style.visibility = 'visible';
    }
    if (password.length < 8 ) {
      this.strength = ' INVALID';
      strengthPwd.style.color = "red";
    } else {
      if (miniscule.test(password)) {
        score += 1;
      }
      if (majuscule.test(password)) {
        score += 1;
      }
      if (chiffre.test(password)) {
        score += 1;
      }
    }
    if (score === 0) {
      this.strength = ' INVALID PASSWORD';
      strengthPwd.style.color = "red";
    } else if (score === 1) {
      this.strength = ' WEAK';
      strengthPwd.style.color = "orangered";
    } else if (score === 2) {
      this.strength = ' MEDIUM';
      strengthPwd.style.color = 'orange';
           } else {
      this.strength = ' STRONG';
      strengthPwd.style.color = "green";
           }
  }

  validateEmail(email) {
    const HTMLElement = document.getElementById('emailValid');
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())){
      HTMLElement.style.visibility = 'hidden';
      HTMLElement.style.marginTop = '-35px';
    } else{
      HTMLElement.style.visibility = 'visible';
      HTMLElement.style.marginTop = '-12px';
        this.emailValidation = "Invalid email";
    }
  }
}
