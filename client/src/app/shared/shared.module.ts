import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from '../app-material.module';
import { RegisterComponent } from '../content/register/register.component';
import { LoginComponent } from '../content/login/login.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule, RouterModule, FlexLayoutModule, AppMaterialModule],
  exports: [HeaderComponent, SidebarComponent, FooterComponent],
  entryComponents: [RegisterComponent, LoginComponent],
})
export class SharedModule {}
