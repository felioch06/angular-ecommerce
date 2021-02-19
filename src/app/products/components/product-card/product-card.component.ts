import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  quantity:number = 0

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit(): void {
  }

  addQuantity(){
    this.quantity++
  }

  removeQuantity(){
  
    this.quantity <= 0 ? this.quantity = 0 : this.quantity--
  }

  addCart() {
    console.log('añadir al carrito');
    this.product = {
      ...this.product,
      quantity: this.quantity,
      total: this.quantity * this.product.price
    }
    this.cartService.addCart(this.product);
    // this.productClicked.emit(this.product.id);
  }

}
