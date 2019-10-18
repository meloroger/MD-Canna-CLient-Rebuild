import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemRequest } from 'src/app/dto/item-request.interface';
import { MatDialogRef } from '@angular/material';
import { ItemFacade } from 'src/app/facades/item.facade';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  editForm: FormGroup;
  selectedItem$: Observable<Item>;

  constructor(
    private formBuilder: FormBuilder,
    private readonly itemFacade: ItemFacade,
    private dialogRef: MatDialogRef<ItemEditComponent>
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });
    this.selectedItem$ = this.itemFacade.selectedItem$.pipe(
      map(item => {
        this.editForm.setValue({
          id: item.id,
          name: item.name
        });
        return item;
      })
    );
  }

  submitEdit() {
    const itemRequest: ItemRequest = this.editForm.value;
    this.itemFacade.updateItem(itemRequest);
    this.dialogRef.close();
  }

  cancelAction() {
    this.dialogRef.close();
  }
}
