import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category/components/category/category.model';
import { Product } from 'src/app/products/components/product/product.model';

import { ProductService } from './../../../core/services/product.service';
import { CategoryService } from './../../../core/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[];
  productsFilter: Product[];
  categories: Category[];

  isFilter:boolean = false;

  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
  ) { }

  ngOnInit(): void {
    this.getProduct()
    this.getCategory()
  }

  filterProducts(id){
    if(id === ''){
      this.isFilter = false
    }else{
      this.isFilter = true
      this.productsFilter = this.products.filter(product=> product.categoryId == id)
    }
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
          ...e.payload.doc.data(),
          idFirebase: e.payload.doc.id
        }
      })
    })
  }
}
