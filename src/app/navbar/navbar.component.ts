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
  constructor(){
  }

  ngOnInit(){
    store.subscribe(() => {
      this.test = store.getState().product.test;
      this.cartItem = store.getState().product.cartItem;
    });
  }


}
