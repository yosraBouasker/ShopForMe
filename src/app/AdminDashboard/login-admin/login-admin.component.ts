import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
    loginForm: FormGroup;
    message = '';

  constructor(private apiService: ApiAuthService, private router: Router) {
    this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
 }

  ngOnInit(): void {
  }

  loginBtn() {
    this.message = '';
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe((res: any) => {
        if (res.message === 'ok') {
          // redirection
          localStorage.setItem('token', res.token);
          localStorage.setItem('isAdmin', 'true');
          this.router.navigate(['/admin'])
          .then(() => {
            window.location.reload();
          });
        } else {
          this.message = res.message;
        }
      });
    }
  }

}
