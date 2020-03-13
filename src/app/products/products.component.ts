import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject  } from "@angular/core";
import {NgForm} from '@angular/forms';

import { PNotifyService } from '../pnotify.service';
import { ConfirmationService } from 'primeng/api';
import {SelectItem} from 'primeng/api';

import { store } from "../store.service";
import {ProductsService} from "../products.service";
import { Product } from '../product';

import { Store, select } from '@ngrx/store';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Dropdown } from 'primeng/dropdown/dropdown';

interface AppState{
  message: string;
}

interface Category {
  name: string;
  value: string;
}

interface Filter {
  search: string;
  category: string;
}

@Component({
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.scss']
})


export class ProductsComponent implements OnInit{

  products: Product[] = [];
  allProduct: Product[];
  arrFil: Product[];
  cols: any[];

  test: string;
  cartItem: number;
  carts: any[];

  pnotify = undefined;

  categories: SelectItem[];
  any: any[];

  btnReset: boolean;
  filSearch: string;
  filCategory: Category;

  params = {};
  @ViewChild('dropCategory') dropCategory: Dropdown;
  @Inject('BASE_URL') baseUrl: string;
  constructor(
    private pnotifyService: PNotifyService,
    private confirmationService: ConfirmationService,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    //private store: Store<AppState>,

  ){
    this.pnotify = this.pnotifyService;
    //this.message = this.store.select('message');
    //this.pnotify.error('Notice me, senpai!');
    this.categories = [
        {label:'All Category', value:null},
        {label:'Casual', value:"casual"},
        {label:'Top', value:"top"},
        {label:'Sweater', value:"sweater"},
        {label:'Promo', value:"promo"},
        {label:'Shoes', value:"shoes"}
    ];
  }


  ngOnInit(){
    this.allData();

    store.subscribe(() => {
      this.test = store.getState().product.test;
      this.cartItem = store.getState().product.cartItem;
      this.carts = store.getState().product.products;
    });

    console.log(this.baseUrl);
  }

  goFilter() {

    this.arrFil = this.allProduct;

    if(this.filSearch!==""){
      this.arrFil = _.filter(this.arrFil, (e) => { return _.includes( _.lowerCase(e.name), _.lowerCase(this.filSearch) ) });
      this.router.navigate(['/products'], { queryParams: {"search": this.filSearch}, queryParamsHandling: 'merge'  });
      this.params['search'] = this.filSearch;
    }
    else{
      delete this.params['search'];
    }

    if (this.filCategory) {
      this.arrFil = _.filter(this.arrFil, (e) => { return e.category == this.filCategory });
      this.router.navigate(['/products'], { queryParams: {"category": this.filCategory}, queryParamsHandling: 'merge'  });
      this.params['category'] = this.filCategory;
    }
    else{
      delete this.params['category'];
    }

    this.router.navigate(['/products'], { queryParams: this.params  });

    if(_.size(this.params) !== 0){
      this.btnReset = true;
    }
    else{
      this.btnReset = false;
    }

    this.products = this.arrFil;

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

  resetFilters(){
    this.router.navigate(['/products'], { queryParams: {} });
    this.allData();
    this.btnReset = false;
    this.filSearch = "";
    this.filCategory = null;
    //dropdown.resetFilter();
  }

  allData(){


    this.productsService.allData().subscribe(data =>{
      this.products = data;
      this.allProduct = data;
      this.arrFil = data;
      //this.any = _.filter(data, (e) => { return _.includes( _.lowerCase(e.name), _.lowerCase('polos') )});
      //console.log(this.any);
    });
    //console.log(this.products);

    //store.dispatch({ type:'TEST_PRODUCT' });

    this.test = store.getState().product.test;
    //this.test = store.getState();
  }

}
