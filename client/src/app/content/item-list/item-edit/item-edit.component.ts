import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemRequest } from 'src/app/dto/item-request.interface';
import { MatDialogRef } from '@angular/material';
import { ItemFacade } from 'src/app/facades/item.facade';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item.interface';

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
    this.selectedItem$ = this.itemFacade.selectedItem$;
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });
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
