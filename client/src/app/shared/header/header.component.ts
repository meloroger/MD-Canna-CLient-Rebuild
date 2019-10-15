import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../../content/register/register.component';
import { LoginComponent } from '../../content/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AccessComponent } from 'src/app/layouts/access/access.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: boolean;
  @Output() sideMenu = new EventEmitter();
  constructor(
    private dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  getUserName(): string {
    const user = this.authService.loadUser();
    return user.fullName;
  }

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
    this.authService.logout().subscribe(rsp => {
      this.router.navigate(['/']);
      console.log(rsp);
    });
  }

  showMenu() {
    this.menu = !this.menu;
    this.sideMenu.emit(this.menu);
  }
}
