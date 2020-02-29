import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject  } from "@angular/core";
import {NgForm} from '@angular/forms';
import { store } from "../store.service";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})


export class NavbarComponent implements OnInit{

  test: string;
  cartItem: number;
  items: any[];
  totalItem: number;

  itemCompare: any[];
  totalCompare: number;

  itemWishlist: any[];
  totalWishlist: number;

  constructor(){
  }

  ngOnInit(){

    store.subscribe(() => {
      this.cartItem     = store.getState().product.cartItem;
      this.totalItem    = this.getTotalItem();
      this.totalCompare = this.getTotalCompare();
      this.totalWishlist = this.getTotalWishlist();
    });

    this.cartItem     = store.getState().product.cartItem;
    this.totalItem    = this.getTotalItem();
    this.totalCompare = this.getTotalCompare();
    this.totalWishlist = this.getTotalWishlist();
  }

  getTotalCompare(){
    this.itemCompare = store.getState().compare.products;
    return this.itemCompare.length;
  }

  getTotalWishlist(){
    this.itemWishlist = store.getState().wishlist.products;
    return this.itemWishlist.length;
  }

  getTotalItem(){
    this.items = store.getState().product.products;

    let total:number = 0;
    this.items.forEach((value)=>{
      total +=value.qty;

    });

    //console.log(total);

    return total;
  }


}
