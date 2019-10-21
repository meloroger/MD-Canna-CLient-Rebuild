import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { StockEditComponent } from './stock-edit/stock-edit.component';
import { Observable } from 'rxjs';
import { StockFacade } from 'src/app/facades/stock.facade';
import { StockMovement } from 'src/app/model/stock-movement.interface';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { StockState } from 'src/app/facades/state/stock-state.interface';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stockMovementsVM$: Observable<StockState>;

  constructor(
    private dialog: MatDialog,
    private readonly stockFacade: StockFacade
  ) {}

  ngOnInit() {
    this.stockMovementsVM$ = this.stockFacade.vm$;
  }

  applyFilter(filterValue: string): void {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createHandler(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(StockCreateComponent, dialogConfig);
  }

  showOrdersHandler(stock: StockMovement): void {
    console.log('clicked');
    const dialogConfig = new MatDialogConfig();
    this.stockFacade.selectStockMovement(stock);
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ShowOrdersComponent, dialogConfig);
  }

  editHandler(stock: StockMovement): void {
    const dialogConfig = new MatDialogConfig();
    this.stockFacade.selectStockMovement(stock);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(StockEditComponent, dialogConfig);
  }

  deleteHandler(id: string): void {
    this.stockFacade.setLoading(true);
    this.stockFacade.removeStockMovement(id);
  }
}
