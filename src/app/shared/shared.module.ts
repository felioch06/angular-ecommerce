import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { HeaderAuthComponent } from './components/header-auth/header-auth.component';
import { MaterialModule } from './material/material.module';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  HeaderHomeComponent,
  HeaderAuthComponent
],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderHomeComponent,
    HeaderAuthComponent
  ]
})
export class SharedModule { }
