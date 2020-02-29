import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject  } from "@angular/core";
import {NgForm} from '@angular/forms';

import { PNotifyService } from '../pnotify.service';
import { ConfirmationService } from 'primeng/api';

import { store } from "../store.service";


@Component({
  templateUrl: 'wishlist.component.html',
  styleUrls: ['wishlist.component.scss']
})


export class WishlistComponent implements OnInit{


  pnotify = undefined;
  wishlist: any[];

  constructor(
    private pnotifyService: PNotifyService,
  ){
    this.pnotify = this.pnotifyService;
  }

  ngOnInit(){
    this.allData();
  }

  deleteItemWishlist(id){
    store.dispatch({type: 'DELETE_WISHLIST_ITEM', product:id});
    this.allData();
  }

  allData(){
    /*
    store.subscribe(() => {
      this.cart = store.getState().product.products;
    });*/
    this.wishlist = store.getState().wishlist.products;
    //console.log(store.getState().product.products);
  }

}
