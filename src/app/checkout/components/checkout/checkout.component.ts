import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/components/product/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products$: Observable<Product[]>;

  form:any = {}

  total:number = 0

  constructor(
    private cartService: CartService,
    private router: Router
    ) {
    this.products$ = this.cartService.cart$
  }
  
  ngOnInit() {
    this.products$.subscribe(res=>{
      res.forEach(product => {  
        this.total += product.total
      });
    })
  }

  async createOrder(){
    this.form = {
      ...this.form,
      total: this.total
    }
    console.log(this.form);
    let orderId:string = "";
    await this.cartService.createOrder(this.form).then((res:any)=>{
      console.log(res.d_.S_.path.segments[1]);
      orderId =res.d_.S_.path.segments[1]
    })

    await this.products$.subscribe(res=>{
      res.forEach(product => {  
        product = {
          ...product,
          orderId: orderId
        }
        this.cartService.createOrderProduct(product)
      });
    })

    this.router.navigate(['/shop/home'])
  }

}
