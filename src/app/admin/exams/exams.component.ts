import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';

import {ConfirmationService} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import {PNotifyService} from '../../pnotify.service';
import {ExamsService} from "../exams.service";
import {Exam} from '../exam';

@Component({
  templateUrl: 'exams.component.html',
  styleUrls: ['exams.component.scss', '../../../assets/admin/libs/css/style.css']
})

export class ExamsComponent implements OnInit {

  exams: Exam[];
  cols: any[]; //define kolom
  first: number = 0; // halaman awal datatable
  editData: Exam;

  examStatus:SelectItem[];

  pnotify = undefined;

  constructor(
    private examsService:ExamsService,
    private pnotifyService: PNotifyService,
    private confirmationService: ConfirmationService
  )
  {
    this.pnotify = this.pnotifyService;
  }

  ngOnInit(): void{
    this.allData();
    this.examStatus = [
      {label: "-- PILIH STATUS -- ", value: null},
      {label: "LULUS", value: "LULUS"},
      {label: "TIDAK LULUS", value: "TIDAK LULUS"}
    ];

    console.log(this.exams);
  }

  allData(): void{
    this.examsService.allData()
      .subscribe(exams => this.exams = exams);
  }

}
