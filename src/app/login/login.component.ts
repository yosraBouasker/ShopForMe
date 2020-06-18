import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../shared/api-auth.service';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message = '';

  constructor(private apiService: ApiAuthService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit() {
  }

  loginBtn() {
    this.message = '';
      this.apiService.login(this.loginForm.value).subscribe((res: any) => {
        if (res.message === 'ok') {
          // redirection
          localStorage.setItem('token', res.token);
          localStorage.setItem('isAdmin', 'false');
          this.router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
        } else {
          this.message = res.message;
        }
      });
  }
}
