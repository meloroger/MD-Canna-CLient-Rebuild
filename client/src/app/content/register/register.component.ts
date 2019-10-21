import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { RegisterRequest } from 'src/app/dto/register-request.interface';
import { RegisterSuccessComponent } from '../info/register-success/register-success.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  private loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private readonly userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  getLoading(): boolean {
    return this.loading;
  }

  submitRegister(): void {
    this.loading = true;
    const registerRequest: RegisterRequest = this.registerForm.value;
    this.userService.registerUser(registerRequest).subscribe(
      rsp => {
        if (rsp) {
          this.loading = false;
          this.snackBar.openFromComponent(RegisterSuccessComponent, {
            data: registerRequest.fullName,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'snackBarInfo'
          });
          this.dialogRef.close();
        }
      },
      err => {
        this.loading = false;
        this.openSnackBar('Oops something went wrong...', 'fail');
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
