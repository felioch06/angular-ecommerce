import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MaterialModule } from '../shared/material/material.module';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductComponent, ProductCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ProductsRoutingModule,
  ],
  exports: [ProductCardComponent]
})
export class ProductsModule { }
