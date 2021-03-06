import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { OrderRequest } from 'src/app/dto/order-request.interface';
import { Item } from 'src/app/model/item.interface';
import { ItemFacade } from 'src/app/facades/item.facade';
import { OrderFacade } from 'src/app/facades/order.facade';
import { Order } from 'src/app/model/order.interface';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  createForm: FormGroup;
  items$: Observable<Item[]>;
  constructor(
    private readonly orderFacade: OrderFacade,
    private readonly itemFacade: ItemFacade,
    private dialogRef: MatDialogRef<OrderCreateComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.items$ = this.itemFacade.items$;
    this.createForm = this.formBuilder.group({
      itemId: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    });
  }

  submitCreate() {
    this.orderFacade.setLoading(true);
    const orderRequest: Order = this.createForm.value;
    console.log(orderRequest);
    this.orderFacade.createOrder(orderRequest);
    this.dialogRef.close();
  }

  cancelAction() {
    this.dialogRef.close();
  }
}
