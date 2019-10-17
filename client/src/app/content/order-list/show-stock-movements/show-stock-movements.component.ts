import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OrderFacade } from 'src/app/facades/order.facade';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order.interface';

@Component({
  selector: 'app-show-stock-movements',
  templateUrl: './show-stock-movements.component.html',
  styleUrls: ['./show-stock-movements.component.css']
})
export class ShowStockMovementsComponent implements OnInit {
  selectedOrder$: Observable<Order>;

  constructor(
    private readonly orderFacade: OrderFacade,
    private readonly dialogRef: MatDialogRef<ShowStockMovementsComponent>
  ) {}

  ngOnInit() {
    this.selectedOrder$ = this.orderFacade.selectedOrder$;
  }

  applyFilter() {}
}
