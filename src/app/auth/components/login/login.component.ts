import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  auth: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  closeAuth(){
    this.auth= false
  }

  login() {
    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.email = ""
        this.password = ""
        this.auth = false
        this.router.navigate(['/shop/home']);
      })
      .catch(() => {
        this.auth = true
      });
  }
}
