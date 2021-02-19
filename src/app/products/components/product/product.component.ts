import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './../../../core/services/product.service';
import { CategoryService } from './../../../core/services/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = [
    'image',
    'idFirebase',
    'name',
    'description',
    'price',
    'category',
    'options',
  ];

  product: Product = {};

  products: Product[];

  image$: Observable<any>;

  isUpdate: boolean = false;

  categories: any[] = [];


  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.getProduct()
    this.getCategory()
  }

  createProduct(){
    console.log(this.product);
    let pepe = this.productService.createproduct(this.product).then(rep=>{
      this.product = {};
    })
  }

  getProduct(){
    this.productService.getproducts().subscribe(resp => {
      this.products = resp.map((e:any)=>{
        return {
          ...e.payload.doc.data(),
          idFirebase: e.payload.doc.id
        }
      })
    })
  }
  getCategory(){
    this.categoryService.getCategory().subscribe(resp => {
      this.categories = resp.map((e:any)=>{
        return {
          title: e.payload.doc.data().name,
          value: e.payload.doc.id
        }
      })
    })
  }
  
  deleteProduct(id){
    this.productService.deleteproduct(id)
  }

  openSelectImage(){
    document.getElementById('img').click()
  }
  setUpdate(product){
    this.product = product
    this.isUpdate = true
  }
  updateProduct(){
        this.productService.updateproduct(this.product.idFirebase, this.product).then(resp => {
          this.isUpdate = false

          this.product = {};
        }).catch(error => {
          console.error(error);
        });

    
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = file.name;
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.product.image = url;
        });
      })
    )
    .subscribe();
  }

}
