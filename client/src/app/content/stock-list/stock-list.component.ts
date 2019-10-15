import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { StockEditComponent } from './stock-edit/stock-edit.component';
import { Observable } from 'rxjs';
import { StockState } from 'src/app/facades/state/stock-state.interface';
import { StockFacade } from 'src/app/facades/stock.facade';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stockVM$: Observable<StockState>;

  constructor(
    private dialog: MatDialog,
    private readonly stockFacade: StockFacade
  ) {}

  ngOnInit() {
    this.stockVM$ = this.stockFacade.vm$;
  }

  applyFilter(filterValue: string): void {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createHandler(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(StockCreateComponent, dialogConfig);
  }

  editHandler(order: object): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(StockEditComponent, dialogConfig);
  }

  deleteHandler(id: string): void {
    console.log(id);
  }
}
