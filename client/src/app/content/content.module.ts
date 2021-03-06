import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ItemChartComponent } from './charts/item-chart/item-chart.component';
import { OrderChartComponent } from './charts/order-chart/order-chart.component';
import { AppMaterialModule } from '../app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-list/order-edit/order-edit.component';
import { OrderCreateComponent } from './order-list/order-create/order-create.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemCreateComponent } from './item-list/item-create/item-create.component';
import { ItemEditComponent } from './item-list/item-edit/item-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee-list/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-list/employee-edit/employee-edit.component';
import { LiveFeedComponent } from './live-feed/live-feed.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockEditComponent } from './stock-list/stock-edit/stock-edit.component';
import { StockCreateComponent } from './stock-list/stock-create/stock-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowOrdersComponent } from './stock-list/show-orders/show-orders.component';
import { ShowStockMovementsComponent } from './order-list/show-stock-movements/show-stock-movements.component';
import { RegisterSuccessComponent } from './info/register-success/register-success.component';
import { StockChartComponent } from './charts/stock-chart/stock-chart.component';
import { TestButtonsComponent } from './test-buttons/test-buttons.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ItemChartComponent,
    OrderChartComponent,
    OrderListComponent,
    OrderEditComponent,
    OrderCreateComponent,
    ItemListComponent,
    ItemCreateComponent,
    ItemEditComponent,
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    StockListComponent,
    StockEditComponent,
    StockCreateComponent,
    LiveFeedComponent,
    ShowOrdersComponent,
    ShowStockMovementsComponent,
    RegisterSuccessComponent,
    StockChartComponent,
    TestButtonsComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports: [
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  entryComponents: [
    OrderEditComponent,
    OrderCreateComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    ItemCreateComponent,
    ItemEditComponent,
    StockCreateComponent,
    StockEditComponent,
    ShowOrdersComponent,
    ShowStockMovementsComponent,
    RegisterSuccessComponent
  ]
})
export class ContentModule {}
