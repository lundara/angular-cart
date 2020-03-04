import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject  } from "@angular/core";
import {NgForm} from '@angular/forms';
import { store } from "../store.service";
import { PNotifyService } from '../pnotify.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})


export class HomeComponent implements OnInit{
  pnotify = undefined;

  constructor(
    private pnotifyService: PNotifyService,
  ){
    this.pnotify = this.pnotifyService;
  }

  ngOnInit(){
  }



}
