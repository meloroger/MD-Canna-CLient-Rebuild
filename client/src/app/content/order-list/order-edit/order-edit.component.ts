import { Component, OnInit } from '@angular/core';
import { OrderFacade } from 'src/app/facades/order.facade';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderRequest } from 'src/app/dto/order-request.interface';
import { MatDialogRef } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  editForm: FormGroup;
  selectedOrder$: Observable<Order>;
  constructor(
    private readonly orderFacade: OrderFacade,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrderEditComponent>
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      itemId: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      complete: ['', [Validators.required]]
    });
    this.selectedOrder$ = this.orderFacade.selectedOrder$.pipe(
      map(order => {
        this.editForm.setValue({
          id: order.id,
          itemId: order.itemId,
          quantity: order.quantity,
          userId: order.userId,
          complete: order.complete
        });
        return order;
      })
    );
  }

  submitEdit() {
    this.orderFacade.setLoading(true);
    const orderRequest: OrderRequest = this.editForm.value;
    this.orderFacade.updateOrder(orderRequest);
    this.dialogRef.close();
  }

  cancelAction() {
    this.dialogRef.close();
  }
}
