import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { StockMovement } from 'src/app/model/stock-movement.interface';
import { Order } from 'src/app/model/order.interface';
import { StockFacade } from 'src/app/facades/stock.facade';
import { OrderFacade } from 'src/app/facades/order.facade';
import { MatDialogRef } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {
  selectedStock$: Observable<StockMovement>;
  orders$: Observable<Order[]>;

  vm$: Observable<any>;

  constructor(
    private readonly stockFacade: StockFacade,
    private readonly orderFacade: OrderFacade,
    private readonly dialogRef: MatDialogRef<ShowOrdersComponent>
  ) {}

  ngOnInit() {
    this.selectedStock$ = this.stockFacade.selectedStock$;
  }

  applyFilter(event) {}
}
