import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {
  constructor(private snackBarRef: MatSnackBarRef<RegisterSuccessComponent>) {}

  ngOnInit() {}

  okAction() {
    this.snackBarRef.dismiss();
  }
}
