import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject, HostListener  } from "@angular/core";
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';


import { PNotifyService } from '../pnotify.service';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { store } from "../store.service";

import * as _ from 'lodash';
declare var Stripe;
@Component({
  templateUrl: 'shipping.component.html',
  styleUrls: ['shipping.component.scss']
})


export class ShippingComponent implements OnInit{

  public payPalConfig ? : IPayPalConfig;
  pnotify = undefined;

  showSuccess:boolean;
  showCancel: boolean;
  showError: boolean;
  gtotal: number = 0;

  products: any[] = [];
  test: any[] = [];

  stripe; // : stripe.Stripe;
  card;
  cardErrors;
  cardN;
  cvc;
  exp;

  loading = false;
  confirmation;

  handler: any;

  nameOnCard: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipcode: string;
  state: string;
  country: string;
  token: string;

  stripeDisabled = true;


  @ViewChild('cardElement') cardElement: ElementRef;
  @ViewChild('cardNumber') cardNumber: ElementRef;
  @ViewChild('cvcNumber') cvcNumber: ElementRef;
  @ViewChild('expCard') expCard: ElementRef;
  constructor(
    private pnotifyService: PNotifyService,
    private router: Router
  ){
    this.pnotify = this.pnotifyService;
  }

  ngOnInit(){

    this.gtotal = this.getGrandTotal();
    this.products = store.getState().product.products;
    this.initConfig();

    this.stripe = Stripe('pk_test_RdW4DTIQXiTLULbUy1vnQUsV');
    const elements = this.stripe.elements();

    /*
    this.card = elements.create('card');
    setTimeout(() => {
      this.card.mount(this.cardElement.nativeElement);
    }, 1000);*/

    this.cardN = elements.create('cardNumber', {
      'placeholder':'Card Number'
    });
    setTimeout(() => {
      this.cardN.mount(this.cardNumber.nativeElement);
    }, 1000);

    this.cvc = elements.create('cardCvc', {
      'placeholder':'CVC Number'
    });
    setTimeout(() => {
      this.cvc.mount(this.cvcNumber.nativeElement);
    }, 1000);

    this.exp = elements.create('cardExpiry', {
      'placeholder':'Expiration'
    });
    setTimeout(() => {
      this.exp.mount(this.expCard.nativeElement);
    }, 1000);

    /*
    this.card.addEventListener('change', ({ error }) => {
        this.cardErrors = error && error.message;
    });*/


  }


  async handleForm(e) {
    e.preventDefault();
    /*
    const { source, error, token } = await this.stripe.createSource(this.card);

    if (error) {
      // Inform the customer that there was an error.
      this.cardErrors = error.message;
    } else {
      // Send the token to your server.
      this.loading = true;
      //const fun = this.functions.httpsCallable('stripeCreateCharge');
      //this.confirmation = await fun({ source: source.id, uid: "212", amount: 989 }).toPromise();
      this.loading = false;
      //console.log(source);


    }*/
    var cardData = {
      'name'  : this.nameOnCard,
      'email'       : this.email,
      //'phone'       : this.phone,
      'address_line1'     : this.address,
      'address_city'        : this.city,
      'address_zip'     : this.zipcode,
      'address_state'       : this.state,
      'address_country'     : this.country,
      //'amount'      : this.gtotal
    };
    this.stripe.createToken(this.cardN, cardData).then(function(result) {
      console.log(result);
      if(result.error && result.error.message){
        alert(result.error.message);
      }else{
        alert(result.token.id);
        //this.token = result.token.id;
      }
    });
    //console.log(this.token);

    //store.dispatch({ type:'ADD_TOKEN_ID_STRIPEJS', tokenId: this.token });
    //
    this.toReceipt();
  }

  toReceipt(){
    setTimeout(()=>{
      this.router.navigate(['/receipt']);
    }, 3000);
  }


  // Close on navigate
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }


  submitStripe(){
    /*
    this.stripe.checkout.sessions.create(
      {
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'T-shirt',
            description: 'Comfortable cotton t-shirt',
            amount: 1500,
            currency: 'usd',
            quantity: 2,
          },
        ],
      },

    );*/


  }

  getGrandTotal(){
    this.products = store.getState().product.products;

    let total:number = 0;
    this.products.forEach((value)=>{
      total +=(value.qty*value.price);

    });
    return total;
  }

  private initConfig(): void {

    let products = [];
    this.products.forEach((value)=>{
     let object = {
        name: value.name,
        quantity: value.qty,
        unit_amount: {
          currency_code: 'USD',
          value: value.price,
        },
     }

     products.push(object);
     //this.test.push(object);
    });
    console.log(products);
    //alert(products);

    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.getGrandTotal().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.getGrandTotal().toString()
                        }
                    }
                },
                items: products
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
            this.toReceipt();

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            //this.resetStatus();
        },
    }
  }



}
