import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../../content/register/register.component';
import { LoginComponent } from '../../content/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menu: boolean;
  @Output() sideMenu = new EventEmitter();

  constructor(
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  getUserName(): string {
    const user = this.authService.loadUser();
    return user.fullName;
  }

  registerHandler(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  loginHandler(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  logoutHandler(): void {
    this.authService.logout();
  }

  showMenu(): void {
    this.menu = !this.menu;
    this.sideMenu.emit(this.menu);
  }
}
