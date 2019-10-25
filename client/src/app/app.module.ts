import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { LayoutsModule } from './layouts/layouts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacadesModule } from './facades/facades.module';
import { OrderService } from './services/order.service';
import { StockService } from './services/stock.service';
import { UserService } from './services/user.service';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ItemService } from './services/item.service';
import { DataLauncher } from './launcher/data.launcher';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,
    FacadesModule
  ],
  providers: [
    AuthService,
    ItemService,
    OrderService,
    StockService,
    UserService,
    ValidateService,
    DataLauncher
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
