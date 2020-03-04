import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

import {Unit} from './admin/unit';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const units = [
      { id: 11, unit_name: 'PCS' },
      { id: 12, unit_name: 'PACK' },
      { id: 13, unit_name: 'SET' },
      { id: 14, unit_name: 'BALL' },
      { id: 15, unit_name: 'SACHET' },
      { id: 16, unit_name: 'BOX' }
    ];
    const exams = [
      { id:'1', student:'Robi', score:'77', exam_date:'2020-02-22', status:'LULUS' },
      { id:'2', student:'Cahya', score:'60', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'3', student:'Lundara', score:'90', exam_date:'2020-02-22', status:'LULUS' },
      { id:'4', student:'Budi', score:'50', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'5', student:'Setiawan', score:'80', exam_date:'2020-02-22', status:'LULUS' },
      { id:'6', student:'Garox', score:'65', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'7', student:'Sandy', score:'30', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'8', student:'Spongebob', score:'80', exam_date:'2020-02-22', status:'LULUS' },
      { id:'9', student:'Patrick', score:'100', exam_date:'2020-02-22', status:'LULUS' },
      { id:'10', student:'Squidward', score:'70', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'11', student:'Mr. Crab', score:'45', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'12', student:'Plankton', score:'75', exam_date:'2020-02-22', status:'LULUS' },
      { id:'13', student:'Mrs. Puff', score:'90', exam_date:'2020-02-22', status:'LULUS' },
      { id:'14', student:'Larry Lobster', score:'60', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'15', student:'Mr. Jenkins', score:'70', exam_date:'2020-02-22', status:'TIDAK LULUS' }
    ];

    const products = [
      {id: '1', name: 'Kaos Polos', price: '500', category:'casual', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam nam quod, maiores praesentium repellendus amet unde consequatur earum qui! Nisi earum qui voluptates ipsum praesentium, maxime ullam eum! Cupiditate.'},
      {id: '2', name: 'Kemeja Supermie', price: '500', category:'top', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam nam quod, maiores praesentium repellendus amet unde consequatur earum qui! Nisi earum qui voluptates ipsum praesentium, maxime ullam eum! Cupiditate.'},
      {id: '3', name: 'Celana Saja', price: '900', category:'casual', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam nam quod, maiores praesentium repellendus amet unde consequatur earum qui! Nisi earum qui voluptates ipsum praesentium, maxime ullam eum! Cupiditate.'},
      {id: '4', name: 'Sweater Rajut', price: '200', category:'sweater', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam nam quod, maiores praesentium repellendus amet unde consequatur earum qui! Nisi earum qui voluptates ipsum praesentium, maxime ullam eum! Cupiditate.'},
      {id: '5', name: 'Kaos Kaki', price: '1000', category:'promo', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam nam quod, maiores praesentium repellendus amet unde consequatur earum qui! Nisi earum qui voluptates ipsum praesentium, maxime ullam eum! Cupiditate.'},
      {id: '6', name: 'Sepatu Bolong', price: '300', category:'shoes', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam nam quod, maiores praesentium repellendus amet unde consequatur earum qui! Nisi earum qui voluptates ipsum praesentium, maxime ullam eum! Cupiditate.'}
    ];

    return {units, exams, products};
  }

  genId(units: Unit[]): number {
    return units.length > 0 ? Math.max(...units.map(unit => unit.id)) + 1 : 11;
  }

}
