import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import { NgxPayPalModule } from 'ngx-paypal';


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
import { HomeComponent } from './home/home.component';
import { ShippingComponent } from './shipping/shipping.component';

import { StripeModule } from "stripe-angular";
import { ReceiptComponent } from './receipt/receipt.component';

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
    WishlistComponent,
    HomeComponent,
    ShippingComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    ),
    NgxPayPalModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    TableModule, ConfirmDialogModule, DropdownModule,
    CommonModule,
    StoreModule.forRoot({todos: ToDoReducer }),
    StripeModule.forRoot("pk_test_6FzksqWYDsUCYRvfMeV5FiY5")



  ],
  providers: [PNotifyService, ConfirmationService, {provide: LOCALE_ID, useValue: 'id' }, { provide: 'BASE_URL', useValue: 'http://localhost:4200/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
