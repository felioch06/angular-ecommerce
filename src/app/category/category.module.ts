import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CategoryRoutingModule,
    FormsModule
  ]
})
export class CategoryModule { }
