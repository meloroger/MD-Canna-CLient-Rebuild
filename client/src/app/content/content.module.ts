import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ItemChartComponent } from './charts/item-chart/item-chart.component';
import { OrderChartComponent } from './charts/order-chart/order-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ItemChartComponent,
    OrderChartComponent,
  ],
  imports: [CommonModule],
  exports: [
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
  ],
})
export class ContentModule {}
