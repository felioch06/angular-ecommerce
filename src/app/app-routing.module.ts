import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminGuard } from './guard/admin.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthComponent } from './shared/layout/auth/auth.component';
import { HomeComponent } from './shared/layout/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
      },
      {
        path:'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
     
    ],
  },
  {
    path: 'shop',
    component: HomeComponent,
    canActivate:[AdminGuard],
    children: [
      {
        path:'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path:'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path:'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        path:'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
      },
     
    ],
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }