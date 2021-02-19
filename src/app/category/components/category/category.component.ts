import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './../../../core/services/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = [
    'idFirebase',
    'image',
    'name',
    'description',
    'options'
  ];

  category: Category = {}

  categories: Category[];

  image$: Observable<any>;

  isUpdate: boolean = false;



  constructor(
    private categoryService:CategoryService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.getCategory()
  }

  createCategory(){
    this.categoryService.createCategory(this.category).then(()=>{
      this.category = {}
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

  deleteCategory(id){
    this.categoryService.deleteCategory(id)
  }

  openSelectImage(){
    document.getElementById('img').click()
  }
  setUpdate(category){
    this.category = category
    this.isUpdate = true
  }
  updateCategory(){
        this.categoryService.updateCategory(this.category.idFirebase, this.category).then(resp => {
          this.isUpdate = false

          this.category = {};
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
          this.category.image = url;
        });
      })
    )
    .subscribe();
  }

}

