import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.createUser(this.email, this.password).then(()=>{
      this.router.navigate(['/auth/login'])
    })
  }

}
