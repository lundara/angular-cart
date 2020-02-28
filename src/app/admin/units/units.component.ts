import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject  } from "@angular/core";
import {AdminNavbarComponent} from "../navbar/navbar.component";
import {NgForm} from '@angular/forms';

import {UnitsService} from "../units.service";
import {Unit} from '../unit';

import { PNotifyService } from '../../pnotify.service';
import { Observable } from 'rxjs';
import {ConfirmationService} from 'primeng/api';
import {ProductsService} from "../../products.service";
import { Product } from '../../product';
@Component({
  templateUrl: 'units.component.html',
  styleUrls: ['units.component.scss', '../../../assets/admin/libs/css/style.css']
})

export class UnitsComponent implements OnInit{
  //keperluan prime table
  units: Unit[]; //data
  cols: any[]; //define kolom
  first: number = 0; // halaman awal datatable
  editData: Unit;

  products: Product[];

  displayDialog: boolean = false;
  displayDialogEdit: boolean = false;
  position: string = "top";
  autofocus: boolean = false;

  exportColumns: any[];

  pnotify = undefined;

  loading: boolean = false;


  @ViewChild('add_unit_name') add_unit_name: ElementRef;
  @ViewChild('edit_unit_name') edit_unit_name: ElementRef;
  @Inject(LOCALE_ID) private locale: string;
  constructor(
    private unitsService:UnitsService,
    private pnotifyService: PNotifyService,
    private confirmationService: ConfirmationService,
    private productsService: ProductsService
  ){
    this.pnotify = this.pnotifyService;
    //this.pnotify.error('Notice me, senpai!');
  }

  addData(f: NgForm){
    /*
    console.log(f["unit_name"]);
    console.log(f.value);*/
    //this.unitsService.addUnit();
    //console.log(this.unitsService.addUnit());
    if(f.valid === true){
      this.unitsService.addUnit(f.value)
        .subscribe(unit => {
          //this.units.push(f.value);
          this.getUnits();
          this.hideDialog();
          f.reset();
          this.pnotify.getNotif("Success", "Data has been saved !", "success");
        });
      //console.log("valid true");
    }

  }

  deleteUnit(unit: Unit): void{
    this.confirmationService.confirm({
        message: 'Are you sure ?',
        accept: () => {
          this.units = this.units.filter(u => u !== unit); //load data yg sudah di filter tanpa httpclient
          this.unitsService.deleteUnit(unit).subscribe(() => {
            this.pnotify.getNotif("Success", "Data has been deleted !", "success")
          });
        },
        reject: () => {
          console.log("no");
        }
    });
  }

  updateData(ef: NgForm){
    this.unitsService.updateUnit(this.editData)
      .subscribe( () => {
        this.getUnits();
        this.hideDialogEdit();
        this.pnotify.getNotif("Success", "Data has been updated !", "success")
      });
  }

  getUnit(id: number): void{
    //this.edit_unit_name.nativeElement.focus();
    this.unitsService.getUnit(id).subscribe(unit => this.editData = unit);
    this.displayDialogEdit = true;
  }

  hideDialogEdit(){
    this.displayDialogEdit = false;
  }

  hideDialog(){
    this.displayDialog = false;
  }

  showDialog(){

    setTimeout(()=>{
      this.displayDialog = true;
    }, 0);


  }

  show_add(){
    this.autofocus = true;
    this.add_unit_name.nativeElement.focus();
    console.log('show_add');
    //alert("modal cliked");
  }

  ngOnInit(){
    this.getUnits();
    //this.units = this.unitsService.getUnits();
    console.log(this.units);
    this.productsService.allData().subscribe(data =>{
      this.products = data;
      console.log(this.products);
    });
  }

  exportPDF() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.cols, this.units);
            doc.save('ngLndPDF.pdf');
        })
    })
  }

  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getExData());
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "primengTable");
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getExData(){
    let units = [];
    for(let unit of this.units){
      unit.unit_name = unit.unit_name.toString();
      units.push(unit);
    }

    return units;
  }

  reset(){
    this.first = 0;
  }

  getUnits(){
    //loading true
    this.unitsService.getUnits()
    .subscribe(units =>{
      this.units = units;
      //loading false
    } );

    this.cols = [
        { field: 'id', header: 'ID', width:'5%' },
        { field: 'unit_name', header: 'Unit Name' },
        { field:'', header: 'Action', width:'25%' }
    ];
    //this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

  }

  reload(){
    this.unitsService.getUnits()
    .subscribe(units => this.units = units);
    //alert("Data telah di reload.")
  }

}
