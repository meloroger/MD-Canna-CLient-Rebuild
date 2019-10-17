import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemFacade } from 'src/app/facades/item.facade';
import { Observable } from 'rxjs';
import { ItemState } from 'src/app/facades/state/item-state.interface';
import { Item } from 'src/app/model/item.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itemVM$: Observable<ItemState>;

  constructor(
    private dialog: MatDialog,
    private readonly itemFacade: ItemFacade
  ) {}

  ngOnInit() {
    this.itemVM$ = this.itemFacade.vm$;
  }

  applyFilter(filterValue: string): void {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createHandler(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ItemCreateComponent, dialogConfig);
  }

  editHandler(item: Item): void {
    const dialogConfig = new MatDialogConfig();
    this.itemFacade.selectItem(item);
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ItemEditComponent, dialogConfig);
  }

  deleteHandler(id: string): void {
    this.itemFacade.deleteItem(id);
  }
}
