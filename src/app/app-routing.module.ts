import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UnitsComponent } from './admin/units/units.component';
import { ExamsComponent } from './admin/exams/exams.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CompareComponent } from './compare/compare.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
  {path: 'admin/units', component: UnitsComponent},
  {path: 'admin/exams', component: ExamsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'compare', component: CompareComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: '', component: HomeComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
