import { Component, OnInit } from '@angular/core';
import { ItemFacade } from 'src/app/facades/item.facade';
import { StockFacade } from 'src/app/facades/stock.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item.interface';
import { StockRequest } from 'src/app/dto/stock-request.interface';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {
  createForm: FormGroup;
  items$: Observable<Item[]>;

  constructor(
    private readonly itemFacade: ItemFacade,
    private readonly stockFacade: StockFacade,
    private formBuider: FormBuilder,
    private dialogRef: MatDialogRef<StockCreateComponent>
  ) {}

  ngOnInit() {
    this.items$ = this.itemFacade.items$;
    this.createForm = this.formBuider.group({
      itemId: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    });
  }

  submitCreate() {
    const stockRequest: StockRequest = this.createForm.value;
    this.stockFacade.createStockMovement(stockRequest);
    this.dialogRef.close();
  }

  cancelAction() {
    this.dialogRef.close();
  }
}
