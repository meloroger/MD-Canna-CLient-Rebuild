import { Component, OnInit, ApplicationRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
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

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private readonly authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitLogin(): void {
    const loginRequest: AuthRequest = this.loginForm.value;
    console.log(loginRequest);
    this.authService.authenticateUser(loginRequest).subscribe(result => {
      console.log(result);
      if (result !== null && result.token !== null) {
        this.authService.storeUserData(result.token, result);
        this.router.navigate(['welcome']);
        this.dialogRef.close();
      }
    });
  }

  cancelAction(): void {
    this.dialogRef.close();
  }
}
