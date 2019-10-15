import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../../content/register/register.component';
import { LoginComponent } from '../../content/login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {}

  registerHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  loginHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  logoutHandler() {
    this.authService.logout();
  }
}
