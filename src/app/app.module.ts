import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';

import { StoreModule } from '@ngrx/store';
import { SampleReducer } from './reducer/sample.reducer';
import { ToDoReducer } from './reducer/todo.reducer';

//import {FocusTrapModule} from 'primeng/focustrap';
import {MenuItem} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import localeid from '@angular/common/locales/id';

import { InMemoryDataService }  from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavbarComponent } from './admin/navbar/navbar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminSidebarComponent } from './admin/sidebar/sidebar.component';
import { UnitsComponent } from './admin/units/units.component';

import { PNotifyService } from './pnotify.service';
import { ExamsComponent } from './admin/exams/exams.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { CompareComponent } from './compare/compare.component';
import { WishlistComponent } from './wishlist/wishlist.component';


registerLocaleData(localeid, 'id');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    UnitsComponent,
    ExamsComponent,
    ProductsComponent,
    NavbarComponent,
    CartComponent,
    CompareComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    ),
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    TableModule, ConfirmDialogModule, DropdownModule,
    CommonModule,
    StoreModule.forRoot({todos: ToDoReducer })



  ],
  providers: [PNotifyService, ConfirmationService, {provide: LOCALE_ID, useValue: 'id' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
