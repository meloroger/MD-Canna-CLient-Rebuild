import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {
  constructor(
    private snackBarRef: MatSnackBarRef<RegisterSuccessComponent>,
    @Inject(MAT_SNACK_BAR_DATA) private data: string
  ) {}

  ngOnInit() {}

  getData(): string {
    return this.data;
  }

  okAction() {
    this.snackBarRef.dismiss();
  }
}
