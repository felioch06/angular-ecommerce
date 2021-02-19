import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { BehaviorSubject } from 'rxjs';

import { Product } from './../../products/components/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  constructor(
    private firestore: AngularFirestore
  ) { }

  addCart(product: Product) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }

  createOrder(order:any){
    return this.firestore.collection("order").add(order);
  }
  createOrderProduct(product:any){
    return this.firestore.collection("orderProduct").add(product);
  }
}