import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiAuthService } from '../shared/api-auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message = '';
  strength = '';

  constructor(private apiService: ApiAuthService, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', []),
      lastname: new FormControl('', []),
      location: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {
  }

  registerBtn() {
    this.message = ""
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.apiService.register(this.registerForm.value).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'ok') {
          console.log(jwt_decode(res.token))
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
        } else {
          this.message = res.message;
        }
      })
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
}
