import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject  } from "@angular/core";
import {NgForm} from '@angular/forms';

import { PNotifyService } from '../pnotify.service';
import { ConfirmationService } from 'primeng/api';

import { store } from "../store.service";


@Component({
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss']
})


export class CartComponent implements OnInit{


  pnotify = undefined;
  cart: any[];
  items: any[];
  gtotal: number;

  qty: number;

  constructor(
    private pnotifyService: PNotifyService,
  ){
    this.pnotify = this.pnotifyService;
  }

  ngOnInit(){
    this.allData();
    this.gtotal = this.getGrandTotal();
  }

  deleteItemCart(id){
    store.dispatch({type: 'DELETE_CART_ITEM', product:id});
    this.allData();
    this.gtotal = this.getGrandTotal();
  }

  getGrandTotal(){
    this.items = store.getState().product.products;

    let total:number = 0;
    this.items.forEach((value)=>{
      total +=(value.qty*value.price);

    });

    //console.log(total);

    return total;
  }

  updateQty(product, event, oldQty){
    this.qty = event.target.value;
    console.log(oldQty);
    store.dispatch({type: 'UPDATE_QTY_CART_ITEM', product:product, newQty: Number(this.qty), oldQty: oldQty});
    this.gtotal = this.getGrandTotal();
  }

  allData(){
    /*
    store.subscribe(() => {
      this.cart = store.getState().product.products;
    });*/
    this.cart = store.getState().product.products;
    console.log(store.getState().product.products);
  }

}
