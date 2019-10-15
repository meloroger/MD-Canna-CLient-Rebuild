import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  MatTableDataSource,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemFacade } from 'src/app/facades/item.facade';
import { Observable } from 'rxjs';
import { ItemState } from 'src/app/facades/state/item-state.interface';
import { Item } from 'src/app/model/item.interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'icon'];
  dataSource: MatTableDataSource<Item>;

  itemVM$: Observable<ItemState>;

  constructor(
    private dialog: MatDialog,
    private readonly itemFacade: ItemFacade
  ) {}

  ngOnInit() {
    this.itemVM$ = this.itemFacade.vm$;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createHandler(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ItemCreateComponent, dialogConfig);
  }

  editHandler(order: object): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ItemEditComponent, dialogConfig);
  }

  deleteHandler(id: string): void {
    console.log(id);
  }
}
