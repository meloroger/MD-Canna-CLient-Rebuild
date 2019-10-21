import { Component, OnInit, ApplicationRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { AuthRequest } from 'src/app/dto/auth-request.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private readonly authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  getLoading(): boolean {
    return this.loading;
  }

  submitLogin(): void {
    this.loading = true;
    const loginRequest: AuthRequest = this.loginForm.value;
    console.log(loginRequest);
    this.authService.authenticateUser(loginRequest).subscribe(
      result => {
        console.log(result);
        this.loading = false;
        if (result !== null && result.token !== null) {
          this.openSnackBar('Your now logged in...');
          this.authService.storeUserData(result.token, result);
          this.router.navigate(['welcome']);
          this.dialogRef.close();
        }
      },
      err => {
        this.loading = false;
        this.openSnackBar('Login attempt failed...');
      }
    );
  }

  cancelAction(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
