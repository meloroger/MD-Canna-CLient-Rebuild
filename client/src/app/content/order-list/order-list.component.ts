import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderFacade } from 'src/app/facades/order.facade';
import { Observable } from 'rxjs';
import { OrderState } from 'src/app/facades/state/order-state.interface';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderVM$: Observable<OrderState>;

  constructor(
    private dialog: MatDialog,
    private readonly orderFacade: OrderFacade
  ) {}

  ngOnInit() {
    this.orderVM$ = this.orderFacade.vm$;
  }

  applyFilter(filterValue: string): void {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createHandler(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(OrderCreateComponent, dialogConfig);
  }

  editHandler(order: object): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(OrderEditComponent, dialogConfig);
  }

  deleteHandler(id: string): void {
    console.log(id);
  }
}
