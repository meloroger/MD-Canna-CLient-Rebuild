import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemFacade } from 'src/app/facades/item.facade';
import { MatDialogRef } from '@angular/material';
import { ItemRequest } from 'src/app/dto/item-request.interface';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly itemFacade: ItemFacade,
    private dialogRef: MatDialogRef<ItemCreateComponent>
  ) {}

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  submitCreate() {
    this.itemFacade.setLoading(true);
    const itemRequest: ItemRequest = this.createForm.value;
    this.itemFacade.createItem(itemRequest);
    this.dialogRef.close();
  }

  cancelAction() {
    this.dialogRef.close();
  }
}
