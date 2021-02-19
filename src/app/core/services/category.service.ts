
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  getCategory(){
    return this.firestore.collection("category").snapshotChanges();
  }

  createCategory(category:any){
    return this.firestore.collection("category").add(category);
  }

  updateCategory(id:any, category:any){
    return this.firestore.collection("category").doc(id).update(category);
  }

  deleteCategory(id:any){
    return this.firestore.collection("category").doc(id).delete();

  }
}