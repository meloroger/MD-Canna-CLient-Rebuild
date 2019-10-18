import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockMovement } from 'src/app/model/stock-movement.interface';
import { StockFacade } from 'src/app/facades/stock.facade';
import { MatDialogRef } from '@angular/material';
import { Observable, combineLatest, merge, zip } from 'rxjs';
import { Item } from 'src/app/model/item.interface';
import { map } from 'rxjs/operators';
import { ItemFacade } from 'src/app/facades/item.facade';
import { StockRequest } from 'src/app/dto/stock-request.interface';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {
  editForm: FormGroup;
  selectedStock$: Observable<StockMovement>;
  items$: Observable<Item[]>;
  vm$: Observable<any>;
  constructor(
    private readonly stockFacade: StockFacade,
    private readonly itemFacade: ItemFacade,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<StockEditComponent>
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      itemId: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    });
    this.selectedStock$ = this.stockFacade.selectedStock$.pipe(
      map(stock => {
        this.editForm.setValue({
          id: stock.id,
          itemId: stock.itemId,
          quantity: stock.quantity
        });
        return stock;
      })
    );

    this.items$ = this.itemFacade.items$;
    this.vm$ = combineLatest(this.selectedStock$, this.items$).pipe(
      map(([selectedStock, items]) => {
        return { selectedStock, items };
      })
    );
  }

  submitEdit() {
    const stockRequest: StockRequest = this.editForm.value;
    console.log(stockRequest);
    this.stockFacade.updateStockMovement(stockRequest);
    this.dialogRef.close();
  }

  cancelAction() {
    this.dialogRef.close();
  }
}
