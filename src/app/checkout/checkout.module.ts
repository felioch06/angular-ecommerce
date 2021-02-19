import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [CheckoutComponent,],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class CheckoutModule { }
