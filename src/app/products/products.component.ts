import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject  } from "@angular/core";
import {NgForm} from '@angular/forms';

import { PNotifyService } from '../pnotify.service';
import { ConfirmationService } from 'primeng/api';

import { store } from "../store.service";
import {ProductsService} from "../products.service";
import { Product } from '../product';

import { Store, select } from '@ngrx/store';

interface AppState{
  message: string;
}

@Component({
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.scss']
})


export class ProductsComponent implements OnInit{

  products: Product[];
  cols: any[];

  test: string;
  cartItem: number;
  carts: any[];

  pnotify = undefined;


  constructor(
    private pnotifyService: PNotifyService,
    private confirmationService: ConfirmationService,
    private productsService: ProductsService,
    //private store: Store<AppState>,

  ){
    this.pnotify = this.pnotifyService;
    //this.message = this.store.select('message');
    //this.pnotify.error('Notice me, senpai!');
  }

  ngOnInit(){
    this.allData();
    this.cols = [
        { field: 'id', header: 'ID', width:'5%' },
        { field: 'unit_name', header: 'Unit Name' },
        { field:'', header: 'Action', width:'25%' }
    ];
    store.subscribe(() => {
      this.test = store.getState().product.test;
      this.cartItem = store.getState().product.cartItem;
      this.carts = store.getState().product.products;
    });

    console.log(this.carts);
  }


  addToCart(product){
    //console.log(product);
    store.dispatch({ type:'ADD_TO_CART', products: product, text: 'hai' });
  }

  compareClick(product){
    store.dispatch({ type:'ADD_COMPARE', products: product });
    //this.test = store.getState().product.test;
  }

  wishlistClick(product){
    store.dispatch({ type:'ADD_WISHLIST', products: product });
    //this.test = store.getState().product.test;
  }


  allData(){
    this.productsService.allData().subscribe(data =>{
      this.products = data;
      console.log(this.products);
    });
    //console.log(this.products);

    //store.dispatch({ type:'TEST_PRODUCT' });

    this.test = store.getState().product.test;
    //this.test = store.getState();
  }

}
