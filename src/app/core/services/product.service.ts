
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  getproducts(){
    return this.firestore.collection("products").snapshotChanges();
  }

  createproduct(producto:any){
    return this.firestore.collection("products").add(producto);
  }

  updateproduct(id:any, producto:any){
    return this.firestore.collection("products").doc(id).update(producto);
  }

  deleteproduct(id:any){
    return this.firestore.collection("products").doc(id).delete();

  }
}