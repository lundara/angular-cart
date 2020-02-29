import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject  } from "@angular/core";
import {NgForm} from '@angular/forms';

import { PNotifyService } from '../pnotify.service';
import { ConfirmationService } from 'primeng/api';

import { store } from "../store.service";


@Component({
  templateUrl: 'compare.component.html',
  styleUrls: ['compare.component.scss']
})


export class CompareComponent implements OnInit{


  pnotify = undefined;
  compare: any[];

  constructor(
    private pnotifyService: PNotifyService,
  ){
    this.pnotify = this.pnotifyService;
  }

  ngOnInit(){
    this.allData();
  }

  deleteItemCompare(id){
    store.dispatch({type: 'DELETE_COMPARE_ITEM', product:id});
    this.allData();
  }

  allData(){
    /*
    store.subscribe(() => {
      this.cart = store.getState().product.products;
    });*/
    this.compare = store.getState().compare.products;
    //console.log(store.getState().product.products);
  }

}
