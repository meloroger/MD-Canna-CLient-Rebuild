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
          this.openSnackBar('Your are now logged in...', 'success');
          this.authService.storeUserData(result.token, result);
          this.router.navigate(['welcome']);
          this.dialogRef.close();
        } else {
          this.openSnackBar('Login attempt failed...', 'fail');
        }
      },
      err => {
        this.loading = false;
        this.openSnackBar('Hmmm...might be a network problem....', 'fail');
        console.log(err);
      }
    );
  }

  cancelAction(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, css: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: css
    });
  }
}
