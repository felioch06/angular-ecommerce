import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/products/components/product/product.model';
import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

  products$:Observable<Product[]>;  

  constructor(
    private authService:AuthService,
    private router: Router,
    private cartService: CartService
  ) { 
    this.products$ = this.cartService.cart$
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/auth/login'])
    })
  }

}
