import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject, HostListener  } from "@angular/core";
import {NgForm} from '@angular/forms';

import { PNotifyService } from '../pnotify.service';
import { store } from "../store.service";

import * as _ from 'lodash';
@Component({
  selector: 'app-receipt',
  templateUrl: 'receipt.component.html',
  styleUrls: ['receipt.component.scss']
})


export class ReceiptComponent implements OnInit{
  tokenId: string;

  pnotify = undefined;
  constructor(
    private pnotifyService: PNotifyService,
  ){
    this.pnotify = this.pnotifyService;
  }

  ngOnInit(){
    this.tokenId = store.getState().product.tokenId;

  }




}
