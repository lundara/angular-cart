import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UnitsComponent } from './admin/units/units.component';
import { ExamsComponent } from './admin/exams/exams.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
  {path: 'admin/units', component: UnitsComponent},
  {path: 'admin/exams', component: ExamsComponent},
  {path: 'products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
